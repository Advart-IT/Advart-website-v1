const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { File } = require('node:buffer');

// Isolated browser/SDK and React harness. No network, real IDs, cookies, or submissions.
function harness(options = {}) {
  const scripts = [], timers = [], calls = [], effects = [], listeners = new Map(), cache = new Map();
  const storage = new Map();
  const env = { NEXT_PUBLIC_ANALYTICS_ENABLED: 'true', NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-TEST1234', NEXT_PUBLIC_CLARITY_PROJECT_ID: 'test1234', NEXT_PUBLIC_META_PIXEL_ID: '123456789', ...options.env };
  const location = new URL(options.url || 'https://example.test/');
  const react = {
    useState(initial) {
      let value = typeof initial === 'function' ? initial() : initial;
      if (value && typeof value === 'object' && 'firstName' in value) value = { firstName: 'Test', email: 'test@example.invalid', role: 'Test', noticePeriod: 'Immediate', location: 'Test', experience: '2', currentCTC: '2', expectedCTC: '3', portfolio: '', resumeUrl: '', resumeFile: new File(['test'], 'private-resume.pdf', { type: 'application/pdf' }) };
      return [value, () => {}];
    },
    useRef: value => ({ current: value }),
    useEffect: effect => effects.push(effect),
  };
  const context = vm.createContext({ console, URL, URLSearchParams, Date, Event, FormData, File, AbortController, crypto: require('node:crypto').webcrypto,
    process: { env }, location, innerWidth: 1200,
    setTimeout: f => { timers.push(f); return timers.length; }, clearTimeout() {},
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v) },
    document: { referrer: options.referrer || '', createElement: () => ({ dataset: {}, remove() {} }), head: { appendChild: s => scripts.push(s) } },
    history: { pushState(_data, _unused, url) { location.href = new URL(url, location.href).href; }, replaceState(_data, _unused, url) { location.href = new URL(url, location.href).href; } },
    addEventListener: (name, f) => listeners.set(name, f), removeEventListener: name => listeners.delete(name), dispatchEvent: e => listeners.get(e.type)?.(e),
    alert() {}, fetch: async () => options.response || { ok: true, json: async () => ({ success: true, ok: true }) },
  });
  context.window = context;
  function load(filename) {
    const resolved = path.resolve(filename);
    if (cache.has(resolved)) return cache.get(resolved).exports;
    const testModule = { exports: {} }; cache.set(resolved, testModule);
    const compiled = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    const req = name => {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === 'react-google-recaptcha') return () => null;
      if (name === '@/lib/analytics') return { beginVisit: () => {}, newAttemptId: () => require('node:crypto').randomUUID(), trackEvent: (...args) => calls.push(args) };
      if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
      const target = path.resolve(path.dirname(resolved), name);
      return load(fs.existsSync(target + '.ts') ? target + '.ts' : path.join(target, 'index.ts'));
    };
    vm.runInContext(`(function(require,module,exports){${compiled}\n})`, context, { filename: resolved })(req, testModule, testModule.exports);
    return testModule.exports;
  }
  const api = load('lib/analytics/index.ts');
  const ready = () => scripts.forEach(s => s.onload());
  const ga = () => Array.from(context.dataLayer || [], a => Array.from(a)).filter(a => a[0] === 'event');
  return { api, load, scripts, timers, context, ready, ga, calls, storage, effects };
}
const full = { analytics: true, marketing: true };
const none = { analytics: false, marketing: false };

test('five consent scenarios gate every provider without replaying earlier interactions', () => {
  for (const [choice, expected] of [[null, []], [full, ['google', 'meta', 'clarity']], [none, []], [{ analytics: true, marketing: false }, ['google', 'clarity']], [{ analytics: false, marketing: true }, ['meta']]]) {
    const h = harness(); h.api.trackEvent('hero_contact_click');
    if (choice) h.api.setConsent(choice); else h.api.initialize();
    assert.deepEqual(h.scripts.map(s => s.dataset.advartAnalytics), expected);
    h.ready(); assert.equal(h.ga().length, 0);
    assert(!(h.context.fbq?.queue || []).some(a => a[1] === 'HeroContactClick'));
  }
});
test('returning visitor restores explicit consent and withdrawal/re-grant requires a fresh document', () => {
  const h = harness(); h.api.setConsent(full); h.ready();
  const saved = h.storage.get(h.api.CONSENT_KEY);
  const returning = harness(); returning.storage.set(h.api.CONSENT_KEY, saved);
  returning.api.setConsent(returning.api.readConsent(), false); assert.equal(returning.scripts.length, 3);
  h.api.setConsent(none); assert.equal(h.api.consentNeedsReload(none), false);
  assert.equal(h.api.consentNeedsReload(full), true);
  h.api.setConsent(full); assert.equal(h.scripts.length, 3); // no duplicate injection before reload
});
test('debug mode and native automatic-data safeguards are configured explicitly', () => {
  const h = harness({ env: { NEXT_PUBLIC_ANALYTICS_DEBUG: 'true' } });
  h.context.console = { info() {} }; h.api.setConsent(full); h.ready(); h.api.trackEvent('cta_click');
  assert.equal(h.ga()[0][2].debug_mode, true);
  const commands = Array.from(h.context.dataLayer, a => Array.from(a));
  assert.equal(commands.find(a => a[0] === 'config')[2].send_page_view, false);
  assert.equal(commands.find(a => a[0] === 'config')[2].allow_google_signals, false);
  assert.equal(h.context.fbq.disablePushState, true);
  assert(h.context.fbq.queue.some(a => a[0] === 'set' && a[1] === 'autoConfig' && a[2] === false));
  assert.equal(h.context.fbq.queue.find(a => a[0] === 'init').length, 2); // no matching payload
  assert(h.context.clarity.q.some(a => a[0] === 'consentv2' && a[1].analytics_Storage === 'granted'));
});

test('no scripts or event queue before explicit consent', () => {
  const h = harness(); h.api.initialize(); h.api.trackEvent('cta_click'); assert.equal(h.scripts.length, 0);
  h.api.setConsent(none); assert.equal(h.scripts.length, 0);
});
test('analytics and marketing independently initialize; providers initialize once', () => {
  const h = harness(); h.api.setConsent({ analytics: true, marketing: false }); assert.equal(h.scripts.length, 2);
  h.api.initialize(); assert.equal(h.scripts.length, 2);
  h.api.setConsent(full); h.api.initialize(); assert.equal(h.scripts.length, 3);
  h.ready(); h.api.trackEvent('cta_click');
  assert.equal(h.ga()[0][1], 'cta_click');
  assert(h.context.fbq.queue.some(a => a[0] === 'trackCustom' && a[1] === 'CTAClick'));
  assert(h.context.clarity.q.some(a => a[0] === 'event' && a[1] === 'cta_click' && a.length === 2));
});
test('marketing-only consent never loads Google or Clarity', () => {
  const h = harness(); h.api.setConsent({ analytics: false, marketing: true }); assert.equal(h.scripts.length, 1); assert.match(h.scripts[0].src, /facebook/);
});
test('invalid provider IDs are independent and never injected', () => {
  const h = harness({ env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: 'bad', NEXT_PUBLIC_CLARITY_PROJECT_ID: '"<script>' } }); h.api.setConsent(full); assert.equal(h.scripts.length, 1);
});
test('all missing IDs and disabled flag are safe', () => {
  for (const env of [{ NEXT_PUBLIC_ANALYTICS_ENABLED: 'false' }, { NEXT_PUBLIC_GA_MEASUREMENT_ID: '', NEXT_PUBLIC_CLARITY_PROJECT_ID: '', NEXT_PUBLIC_META_PIXEL_ID: '' }]) {
    const h = harness({ env }); h.api.setConsent(full); h.api.beginVisit('/'); h.api.trackEvent('cta_click'); assert.equal(h.scripts.length, 0);
  }
});
test('page views once per visit, remount, back/forward and separate late consent', () => {
  const h = harness(); h.api.setConsent({ analytics: true, marketing: false }); h.api.beginVisit('/'); h.ready(); h.api.beginVisit('/');
  assert.equal(h.ga().filter(a => a[1] === 'page_view').length, 1);
  h.api.setConsent(full); h.api.beginVisit('/'); h.scripts.at(-1).onload();
  assert.equal(h.context.fbq.queue.filter(a => a[1] === 'PageView').length, 1);
  h.context.location.pathname = '/aboutus'; h.api.beginVisit('/aboutus'); h.context.location.pathname = '/'; h.api.beginVisit('/');
  assert.equal(h.ga().filter(a => a[1] === 'page_view').length, 3);
  assert(!h.context.clarity.q.some(a => a[0] === 'event' && a[1] === 'page_view'));
});
test('scroll/impression keys deduplicate per visit and reset on navigation', () => {
  const h = harness(); h.api.setConsent(full); h.ready(); h.api.beginVisit('/');
  for (let repeat = 0; repeat < 3; repeat++) for (const n of [25, 50, 75, 90]) h.api.trackEvent('scroll_depth', { scroll_percentage: n }, { once: String(n) });
  assert.equal(h.ga().filter(a => a[1] === 'scroll_depth').length, 4);
  h.api.beginVisit('/aboutus'); h.api.trackEvent('scroll_depth', { scroll_percentage: 25 }, { once: '25' }); assert.equal(h.ga().filter(a => a[1] === 'scroll_depth').length, 5);
});
test('conversions deduplicate across remounts; jobs never map to Lead', () => {
  const h = harness(); h.api.setConsent(full); h.ready();
  h.api.trackEvent('contact_form_success', {}, { conversionId: 'opaque-attempt' });
  h.api.beginVisit('/new'); h.api.trackEvent('contact_form_success', {}, { conversionId: 'opaque-attempt' });
  h.api.trackEvent('job_application_success', {}, { conversionId: 'job-attempt' });
  assert.equal(h.ga().filter(a => a[1] === 'generate_lead').length, 1);
  assert.equal(h.context.fbq.queue.filter(a => a[0] === 'track' && a[1] === 'Lead').length, 1);
  assert(h.context.fbq.queue.some(a => a[0] === 'trackCustom' && a[1] === 'JobApplicationSuccess'));
});
test('conversion and error mapping uses correct standard/custom APIs', () => {
  const { mapping, events } = harness().load('lib/analytics/events.ts');
  for (const event of events) { assert(mapping(event).google); assert(mapping(event).meta); }
  assert.equal(mapping('product_view').google, 'view_item'); assert.equal(mapping('product_view').metaMethod, 'track');
  assert.equal(mapping('demo_request_success').google, 'generate_lead');
  assert.equal(mapping('job_application_error').meta, 'FormSubmitError');
  assert.equal(mapping('contact_form_error').clarity, 'form_submit_error');
});
test('blocked and timed-out scripts fail closed, bounded pending events', () => {
  const h = harness(); h.api.setConsent(full);
  for (let n = 0; n < 200; n++) h.api.trackEvent('cta_click', { button_name: 'safe' });
  h.scripts.find(s => s.dataset.advartAnalytics === 'google').onload(); assert.equal(h.ga().length, 50);
  h.scripts.find(s => s.dataset.advartAnalytics === 'meta').onerror();
  h.timers.at(-1)(); assert.doesNotThrow(() => h.api.trackEvent('cta_click'));
});
test('withdrawal drops pending events, stops SDKs and prevents further dispatch', () => {
  const h = harness(); h.api.setConsent(full); h.api.trackEvent('contact_form_success'); h.api.setConsent(none); h.ready();
  assert.equal(h.ga().length, 0); assert(!h.context.fbq.queue.some(a => a[1] === 'Lead'));
  assert(h.context.clarity.q.some(a => a[0] === 'stop'));
  h.api.trackEvent('cta_click'); assert.equal(h.ga().length, 0);
});
test('SDK exceptions do not escape trackEvent', () => {
  const h = harness(); h.api.setConsent(full); h.ready(); h.context.gtag = () => { throw Error('blocked'); };
  assert.doesNotThrow(() => h.api.trackEvent('cta_click'));
});
test('URLs, sensitive queries, dynamic route values and arbitrary parameters are dropped', () => {
  const h = harness({ url: 'https://example.test/careers/private-person/apply?email=test%40example.test&token=secret' });
  h.api.setConsent(full); assert.equal(h.scripts.length, 1); h.ready();
  h.api.trackEvent('cta_click', { email: 'secret@example.test', button_name: 'secret@example.test', destination_path: '/contactus?otp=123456', error_code: 'Private error content', job_id: '1234567890' });
  const payload = h.ga()[0][2]; assert.equal(payload.page_path, '/careers/[job]/apply'); assert.equal(payload.destination_path, '/contactus');
  assert(!JSON.stringify(payload).includes('secret')); assert(!JSON.stringify(payload).includes('private-person')); assert(!('job_id' in payload));
});
test('unsafe referrers suppress native SDKs, Google never receives raw referrer', () => {
  const h = harness({ referrer: 'https://example.test/?email=private@example.test' }); h.api.setConsent(full); assert.equal(h.scripts.length, 1); h.ready(); h.api.trackEvent('cta_click'); assert.equal(h.ga()[0][2].page_referrer, '');
});
test('sensitive navigation stops recording before URL mutation and cleans history hooks', () => {
  const h = harness(); const original = h.context.history.pushState; const cleanup = h.api.protectNavigation(); h.api.setConsent(full); h.ready();
  h.context.history.pushState(null, '', '/careers/private/apply?token=secret');
  assert(h.context.clarity.q.some(a => a[0] === 'stop')); assert(h.context.fbq.queue.some(a => a[0] === 'consent' && a[1] === 'revoke'));
  cleanup(); assert.equal(h.context.history.pushState, original);
});
test('consent persistence rejects malformed, expired and wrong version values', () => {
  const h = harness(); h.storage.set(h.api.CONSENT_KEY, '{'); assert.equal(h.api.readConsent(), null);
  h.storage.set(h.api.CONSENT_KEY, JSON.stringify({ version: 1, at: 0, ...full })); assert.equal(h.api.readConsent(), null);
  h.api.setConsent(full); assert.equal(h.api.readConsent().analytics, true);
});

function interactions() {
  const h = harness(), handlers = new Map(), frames = [], observations = [];
  class Element {
    constructor(attributes = {}) { this.dataset = attributes; this.parents = {}; }
    closest(selector) { return this.parents[selector] || null; }
    getAttribute(name) { return name === 'href' ? this.href : null; }
    querySelector() { return null; }
    querySelectorAll() { return []; }
    getClientRects() { return [{}]; }
  }
  h.context.Element = h.context.HTMLElement = Element;
  h.context.HTMLVideoElement = class extends Element {};
  h.context.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observations.push(this); }
    observe() {} unobserve() {} disconnect() { this.disconnected = true; }
  };
  h.context.MutationObserver = class { observe() {} disconnect() {} };
  h.context.document.querySelectorAll = () => [];
  h.context.document.querySelector = () => new Element();
  h.context.document.documentElement = { scrollHeight: 2000 };
  h.context.document.addEventListener = (name, fn) => handlers.set(name, fn);
  h.context.document.removeEventListener = name => handlers.delete(name);
  h.context.innerHeight = 1000; h.context.scrollY = 900;
  h.context.requestAnimationFrame = fn => { frames.push(fn); return frames.length; };
  h.context.cancelAnimationFrame = () => {};
  h.load('components/analytics/interaction-tracker.tsx').default({ visitKey: '/', revision: 0 });
  const cleanup = h.effects[0]();
  return { ...h, handlers, Element, cleanup, observations, frames };
}
test('delegation replaces automatic events, preserves native click and hero placement', () => {
  const h = interactions();
  const el = new h.Element({ trackEvent: 'hero_contact_click', trackName: 'contact_us', trackPlacement: 'homepage_hero', trackCta: 'true' });
  el.href = '/contactus?email=private@example.test'; el.parents['[data-track-event], a[href]'] = el;
  h.handlers.get('click')({ target: el, preventDefault() { assert.fail('must not cancel click'); } });
  assert.deepEqual(h.calls.map(c => c[0]), ['hero_contact_click', 'cta_click', 'homepage_cta_click']);
  assert.equal(h.calls[0][1].destination_path, '/contactus'); assert.equal(h.calls[0][1].placement, 'homepage_hero');
  h.cleanup(); assert.equal(h.handlers.size, 0); assert(h.observations[0].disconnected);
});
test('delegation sends no email/phone destination or raw link text', () => {
  const h = interactions();
  for (const [href, event] of [['mailto:private@example.test', 'email_click'], ['tel:+1234567890', 'phone_click']]) {
    const el = new h.Element(); el.href = href; el.parents['[data-track-event], a[href]'] = el;
    h.handlers.get('click')({ target: el }); assert.equal(h.calls.at(-1)[0], event); assert.equal(h.calls.at(-1)[1].destination_path, undefined);
  }
  assert(!JSON.stringify(h.calls).includes('private')); assert(!JSON.stringify(h.calls).includes('1234567890')); h.cleanup();
});
test('section impressions and scroll callbacks use stable per-visit deduplication keys', () => {
  const h = interactions();
  const el = new h.Element({ trackView: 'service_view', trackContent: 'branding' });
  h.observations[0].callback([{ target: el, isIntersecting: true, intersectionRatio: 0.3 }]);
  assert.equal(h.calls.find(c => c[0] === 'service_view')[2].once, 'branding');
  h.frames[0](); assert.deepEqual(h.calls.filter(c => c[0] === 'scroll_depth').map(c => c[1].scroll_percentage), [25, 50, 75, 90]);
  h.cleanup();
});

function find(node, predicate) {
  if (!node || typeof node !== 'object') return null;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) { const result = find(child, predicate); if (result) return result; }
  return null;
}
function contactForm() {
  const data = new FormData(); data.set('reason', 'dot_demo');
  return data;
}
test('contact confirmed demo produces one lead, no raw form payload; repeat click locked', async () => {
  let resolve;
  const h = harness({ response: { ok: true, json: () => new Promise(r => { resolve = r; }) } });
  // Browser FormData(form) is emulated with a fixed test input, never sent to an endpoint.
  h.context.FormData = class { constructor() { return contactForm(); } };
  const Component = h.load('app/contactus/page.tsx').default;
  const form = find(Component(), n => n.type === 'form');
  const e = { preventDefault() {}, currentTarget: { reset() {} } };
  const pending = form.props.onSubmit(e); await form.props.onSubmit(e); await Promise.resolve();
  resolve({ success: true }); await pending;
  assert.equal(h.calls.filter(c => c[0] === 'contact_form_submit').length, 1);
  assert.equal(h.calls.filter(c => c[0] === 'demo_request_success').length, 1);
  assert.equal(h.calls.filter(c => c[0] === 'contact_form_success').length, 0);
});
test('failed or unconfirmed contact responses never produce a lead', async () => {
  for (const response of [{ ok: false }, { ok: true, json: async () => ({ success: false }) }]) {
    const h = harness({ response }); h.context.FormData = class { constructor() { return contactForm(); } };
    const form = find(h.load('app/contactus/page.tsx').default(), n => n.type === 'form');
    await form.props.onSubmit({ preventDefault() {}, currentTarget: { reset() {} } });
    assert(h.calls.some(c => c[0] === 'contact_form_error')); assert(!h.calls.some(c => ['contact_form_success', 'demo_request_success'].includes(c[0])));
  }
});
for (const filename of ['components/apply-form.tsx', 'components/open-application-form.tsx']) {
  test(`${filename}: only backend-confirmed application/resume success, no applicant data`, async () => {
    for (const ok of [true, false]) {
      const h = harness({ response: { ok, json: async () => ({ ok }) } });
      const tree = h.load(filename).default({});
      const button = find(tree, n => n.type === 'button' && n.props.children === 'Submit Application');
      assert(button); await button.props.onClick({ preventDefault() {} });
      assert.equal(h.calls.filter(c => c[0] === 'job_application_success').length, ok ? 1 : 0);
      assert.equal(h.calls.filter(c => c[0] === 'resume_upload_success').length, ok ? 1 : 0);
      assert(!JSON.stringify(h.calls).includes('test@example')); assert(!JSON.stringify(h.calls).includes('private-resume'));
      assert(!h.calls.some(c => c[0] === 'contact_form_success'));
    }
  });
}
