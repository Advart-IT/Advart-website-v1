import { config } from './config';
import { isEvent, type EventName } from './events';
import { campaigns, nativeSafe, routes, safePath, safeReferrer, sanitize } from './privacy';
import type { Consent, Parameters, Provider } from './types';
import { googleConsent, googleEvent, initGoogle, prepareGoogle } from './providers/google';
import { initMeta, metaEvent, prepareMeta } from './providers/meta';
import { clarityConsent, clarityEvent, prepareClarity } from './providers/clarity';

export const CONSENT_KEY = 'advart_consent_v1';
export const denied: Consent = { analytics: false, marketing: false };
let consent: Consent = denied;
type Status = 'idle' | 'loading' | 'ready' | 'failed' | 'stopped';
const status: Record<Provider, Status> = { google: 'idle', clarity: 'idle', meta: 'idle' };
const queues: Record<Provider, { event: EventName; params: Parameters; url: string }[]> = { google: [], clarity: [], meta: [] };
let visitKey = '';
let visit = 0;
const seen = new Set<string>();
const conversions = new Set<string>();
export function debug(reason: string, details: object = {}) { if (config.debug) console.info('[analytics]', { reason, ...details }); }
export function getConsent() { return consent; }
/** Restart stopped SDKs in a fresh document, never by injecting a duplicate script. */
export function consentNeedsReload(next: Consent): boolean {
  if (typeof window === 'undefined' || !config.enabled) return false;
  return (['google', 'clarity', 'meta'] as const).some(provider =>
    !!config[provider] && status[provider] === 'stopped' &&
    (provider === 'meta' ? next.marketing : next.analytics) &&
    (provider === 'google' || (nativeSafe(location.href, provider === 'clarity') && safeReferrer(document.referrer))));
}
let attemptNumber = 0;
/** Local deduplication token only; never passed to an analytics provider. */
export function newAttemptId(): string {
  try { return crypto.randomUUID(); } catch { return `attempt-${Date.now()}-${++attemptNumber}`; }
}
export function readConsent(): Consent | null {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return stored?.version === 1 && Number.isFinite(stored.at) && stored.at <= Date.now() && Date.now() - stored.at < 180 * 86400000 && typeof stored.analytics === 'boolean' && typeof stored.marketing === 'boolean'
      ? { analytics: stored.analytics, marketing: stored.marketing } : null;
  } catch { return null; }
}
export function context(): Parameters {
  if (typeof window === 'undefined') return {};
  const path = safePath(location.pathname);
  return { page_path: path, page_title: routes[path] || (path === '/careers/[job]/apply' ? 'Job application' : 'Other'), page_location: location.origin + path, device_type: innerWidth < 768 ? 'mobile' : 'desktop', ...campaigns(location.search) };
}
function eligible(provider: Provider) {
  if (typeof window === 'undefined' || !config.enabled || !config[provider]) return false;
  if (provider === 'google') return consent.analytics;
  return (provider === 'meta' ? consent.marketing : consent.analytics) && nativeSafe(location.href, provider === 'clarity') && safeReferrer(document.referrer);
}
function dispatch(provider: Provider, event: EventName, params: Parameters) {
  try {
    if (provider === 'google') googleEvent(event, params);
    else if (provider === 'meta') metaEvent(event, params);
    else clarityEvent(event);
    debug('dispatch_attempt', { provider, event, params });
  } catch { debug('dispatch_failed', { provider, event }); }
}
export function trackEvent(event: EventName, params: Parameters = {}, options: { once?: string; conversionId?: string } = {}) {
  if (typeof window === 'undefined' || !config.enabled || !isEvent(event)) return;
  const key = `${visit}:${event}:${options.once}`;
  if (options.once && seen.has(key) || options.conversionId && conversions.has(options.conversionId)) { debug('duplicate_skipped', { event }); return; }
  const providers = (['google', 'clarity', 'meta'] as const).filter(p => eligible(p) && status[p] !== 'failed' && status[p] !== 'stopped');
  if (!providers.length) { debug('event_skipped', { event, consent }); return; }
  if (options.once) { if (seen.size >= 1000) seen.delete(seen.values().next().value!); seen.add(key); }
  if (options.conversionId) { if (conversions.size >= 100) conversions.delete(conversions.values().next().value!); conversions.add(options.conversionId); }
  const clean = sanitize({ ...context(), ...params });
  for (const provider of providers) {
    if (status[provider] === 'ready') dispatch(provider, event, clean);
    else if (status[provider] === 'loading') {
      if (queues[provider].length === 50) queues[provider].shift();
      queues[provider].push({ event, params: clean, url: location.href });
      debug('queued', { provider, event, params: clean });
    }
  }
}
function load(provider: Provider, src: string) {
  if (!eligible(provider) || status[provider] !== 'idle') return;
  status[provider] = 'loading';
  debug('provider_loading', { provider });
  try {
    if (provider === 'google') prepareGoogle();
    else if (provider === 'meta') prepareMeta();
    else prepareClarity(consent);
    // Explicit async loader permits per-provider failure/consent cancellation without a React render.
    const script = document.createElement('script');
    script.async = true; script.src = src; script.referrerPolicy = 'no-referrer';
    script.dataset.advartAnalytics = provider;
    const fail = () => { status[provider] = 'failed'; queues[provider] = []; script.remove(); debug('provider_failed', { provider }); };
    const timer = window.setTimeout(fail, 15000);
    script.onerror = () => { clearTimeout(timer); fail(); };
    script.onload = () => {
      clearTimeout(timer);
      if (status[provider] !== 'loading' || !eligible(provider)) { stop(provider); return; }
      try {
        if (provider === 'google') { googleConsent(true); initGoogle(context()); }
        if (provider === 'meta') initMeta();
        status[provider] = 'ready';
        debug('provider_ready', { provider, consent });
        const pending = queues[provider].splice(0);
        for (const item of pending) if (eligible(provider) && (provider === 'google' || item.url === location.href)) dispatch(provider, item.event, item.params);
      } catch { fail(); }
    };
    document.head.appendChild(script);
  } catch { status[provider] = 'failed'; queues[provider] = []; debug('provider_failed', { provider }); }
}
function stop(provider: Provider) {
  queues[provider] = [];
  if (status[provider] === 'idle') return;
  status[provider] = 'stopped';
  try {
    if (provider === 'google') googleConsent(false);
    if (provider === 'meta') { if (window.fbq) window.fbq.queue.length = 0; window.fbq?.('consent', 'revoke'); }
    if (provider === 'clarity') { if (window.clarity?.q) window.clarity.q.length = 0; clarityConsent(denied); window.clarity?.('stop'); }
  } catch { /* SDK failure must never affect the website */ }
}
export function initialize() {
  if (typeof window === 'undefined' || !config.enabled) return;
  for (const provider of ['google', 'clarity', 'meta'] as const) if (!config[provider]) debug('missing_or_invalid_configuration', { provider });
  load('google', `https://www.googletagmanager.com/gtag/js?id=${config.google}`);
  load('meta', 'https://connect.facebook.net/en_US/fbevents.js');
  load('clarity', `https://www.clarity.ms/tag/${config.clarity}`);
}
export function setConsent(next: Consent, persist = true) {
  consent = { analytics: next.analytics === true, marketing: next.marketing === true };
  if (persist) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...consent, version: 1, at: Date.now() })); } catch { /* session-only consent */ } }
  for (const p of ['google', 'clarity', 'meta'] as const) if (!eligible(p)) stop(p);
  try { if (status.clarity === 'ready') clarityConsent(consent); } catch { /* fail closed at dispatch */ }
  debug('consent_updated', { consent });
  initialize();
  window.dispatchEvent(new Event('advart:consent'));
}
export function beginVisit(key: string) {
  if (visitKey !== key) { visitKey = key; visit++; seen.clear(); }
  initialize();
  // Independent provider keys permit a newly granted category to receive this page once.
  for (const provider of ['google', 'clarity', 'meta'] as const) {
    const id = `page:${provider}`;
    if (!eligible(provider) || seen.has(id) || ['failed', 'stopped'].includes(status[provider])) continue;
    seen.add(id);
    if (provider === 'clarity') continue; // native page tracking only
    const params = sanitize(context());
    if (status[provider] === 'ready') dispatch(provider, 'page_view', params);
    else if (status[provider] === 'loading') {
      if (queues[provider].length === 50) queues[provider].shift();
      queues[provider].push({ event: 'page_view', params, url: location.href });
    }
  }
}
/** Stop recording before App Router mutates the URL. A stopped SDK stays stopped until reload. */
export function protectNavigation() {
  const push = history.pushState, replace = history.replaceState;
  const guard = (url?: string | URL | null) => {
    if (!url) return;
    try {
      const target = new URL(String(url), location.href).href;
      if (!nativeSafe(target, true)) stop('clarity');
      if (!nativeSafe(target)) stop('meta');
    } catch { stop('clarity'); stop('meta'); }
  };
  const wrappedPush: History['pushState'] = function (this: History, data, unused, url) { guard(url); return push.call(this, data, unused, url); };
  const wrappedReplace: History['replaceState'] = function (this: History, data, unused, url) { guard(url); return replace.call(this, data, unused, url); };
  history.pushState = wrappedPush; history.replaceState = wrappedReplace;
  const pop = () => guard(location.href);
  window.addEventListener('popstate', pop); window.addEventListener('hashchange', pop);
  return () => { if (history.pushState === wrappedPush) history.pushState = push; if (history.replaceState === wrappedReplace) history.replaceState = replace; window.removeEventListener('popstate', pop); window.removeEventListener('hashchange', pop); };
}
