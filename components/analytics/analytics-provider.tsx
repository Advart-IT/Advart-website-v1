'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { CONSENT_KEY, consentNeedsReload, denied, getConsent, protectNavigation, readConsent, setConsent } from '@/lib/analytics';
import { config } from '@/lib/analytics/config';
import type { Consent } from '@/lib/analytics/types';
import PageViewTracker from './page-view-tracker';

export default function AnalyticsProvider() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [choice, setChoice] = useState<Consent>(denied);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!config.enabled) return;
    const restore = protectNavigation();
    const saved = readConsent();
    setConsent(saved || denied, false); setChoice(saved || denied); setOpen(!saved);
    const show = () => {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setChoice(getConsent()); setPreferences(true); setOpen(true);
    };
    const sync = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY || e.key === null) {
        const saved = readConsent();
        setConsent(saved || denied, false); setChoice(saved || denied); setOpen(!saved); setPreferences(false);
      }
    };
    window.addEventListener('advart:preferences', show);
    window.addEventListener('storage', sync);
    return () => { restore(); window.removeEventListener('storage', sync); window.removeEventListener('advart:preferences', show); };
  }, []);
  useEffect(() => { if (open && preferences) heading.current?.focus({ preventScroll: true }); }, [open, preferences]);
  const save = (next: Consent) => {
    const reload = consentNeedsReload(next);
    setConsent(next); setChoice(next); setOpen(false); setPreferences(false);
    opener.current?.focus({ preventScroll: true });
    if (reload) window.location.reload();
  };
  const button = 'min-h-11 min-w-0 rounded-lg border border-black/20 bg-[#F6F7F9] px-3 py-2 text-[13px] font-medium hover:bg-[#ffdc38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';
  if (!config.enabled) return null;
  return <>
    <Suspense fallback={null}><PageViewTracker /></Suspense>
    {open && <aside data-analytics-ignore="true" data-clarity-mask="true" aria-labelledby="analytics-consent-title"
      className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-[max(12px,env(safe-area-inset-left))] right-[max(12px,env(safe-area-inset-right))] z-[10001] max-h-[calc(100dvh-32px)] overflow-y-auto rounded-xl border border-black/10 bg-white p-4 text-black shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:w-[340px] sm:max-w-[340px]">
      <h2 ref={heading} tabIndex={-1} id="analytics-consent-title" className="text-sm font-semibold outline-none">Cookie preferences</h2>
      <p className="mt-1 text-[13px] leading-5 text-black/65">We use cookies for analytics and advertising.</p>
      {preferences && <fieldset className="mt-3 space-y-2 border-t border-black/10 pt-3 text-[13px]">
        <legend className="sr-only">Optional cookie categories</legend>
        <label className="flex min-h-11 items-center gap-2"><input type="checkbox" className="h-4 w-4 shrink-0 accent-black" checked={choice.analytics} onChange={e => setChoice({ ...choice, analytics: e.target.checked })} />Analytics: Google Analytics and Clarity</label>
        <label className="flex min-h-11 items-center gap-2"><input type="checkbox" className="h-4 w-4 shrink-0 accent-black" checked={choice.marketing} onChange={e => setChoice({ ...choice, marketing: e.target.checked })} />Advertising: Meta Pixel</label>
        <p className="text-xs leading-4 text-black/60">Change or withdraw consent anytime. Re-enabling a stopped tracker reloads this page; save any form work first.</p>
        <button type="button" className={`${button} w-full`} onClick={() => save(choice)}>Save preferences</button>
      </fieldset>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" className={button} onClick={() => save(denied)}>Reject all</button>
        <button type="button" className={button} onClick={() => save({ analytics: true, marketing: true })}>Accept all</button>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs text-black/60">
        <button type="button" className="min-h-11 underline underline-offset-2 hover:text-black" aria-expanded={preferences} onClick={() => setPreferences(v => !v)}>Preferences</button>
        <a className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-black" href="/privacy-policy">Privacy policy</a>
      </div>
    </aside>}
  </>;
}
