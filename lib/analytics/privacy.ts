import { campaignCodes } from './config';
import type { Parameters } from './types';
export const routes: Record<string, string> = {
  '/': 'Home', '/aboutus': 'About', '/advartgen': 'AdvartGen', '/careers': 'Careers',
  '/contactus': 'Contact', '/dot': 'Dot', '/works/beelittle': 'Beelittle',
  '/privacy-policy': 'Privacy Policy', '/terms-conditions': 'Terms and Conditions',
};
export function safePath(raw: string): string {
  try {
    const path = new URL(raw, 'https://analytics.invalid').pathname.replace(/\/$/, '') || '/';
    return routes[path] ? path : /^\/careers\/[^/]+\/apply$/.test(path) ? '/careers/[job]/apply' : '/other';
  } catch { return '/other'; }
}
export function campaigns(search: string): Parameters {
  const params: Parameters = {};
  const query = new URLSearchParams(search);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const) {
    const value = query.get(key);
    if (value && campaignCodes.includes(value)) params[key] = value;
  }
  return params;
}
/** Native SDKs read location/referrer themselves: suppress rather than pretend to sanitize them. */
export function nativeSafe(raw: string, clarity = false): boolean {
  try {
    const u = new URL(raw);
    return ['http:', 'https:'].includes(u.protocol) && !u.username && !u.password && !u.search && !u.hash &&
      !!routes[u.pathname] && !(clarity && ['/careers', '/contactus'].includes(u.pathname));
  } catch { return false; }
}
export function safeReferrer(raw: string): boolean { return !raw || nativeSafe(raw); }
export function sanitize(input: Parameters): Parameters {
  const out: Parameters = {};
  const tokens = new Set(['section_name', 'button_name', 'placement', 'destination_type', 'form_name', 'lead_type', 'content_name', 'content_category', 'video_name', 'device_type', 'error_code']);
  for (const [key, value] of Object.entries(input)) {
    let clean: string | number | undefined;
    if (key === 'page_path' || key === 'destination_path') clean = safePath(String(value));
    else if (key === 'page_title') clean = [...Object.values(routes), 'Job application', 'Other'].includes(String(value)) ? String(value) : 'Other';
    else if (key === 'page_location') {
      try { const url = new URL(String(value)); if (/^https?:$/.test(url.protocol)) clean = url.origin + safePath(url.pathname); } catch { /* drop */ }
    } else if (['scroll_percentage', 'video_progress'].includes(key) && typeof value === 'number' && Number.isFinite(value)) clean = Math.max(0, Math.min(100, value));
    else if (key === 'job_id' && /^\d{1,6}$/.test(String(value))) clean = String(value);
    else if (key.startsWith('utm_') && campaignCodes.includes(String(value))) clean = String(value);
    else if (tokens.has(key) && typeof value === 'string' && /^[a-z][a-z0-9_]{0,63}$/.test(value) && !/\d{6}/.test(value)) clean = value;
    if (clean !== undefined) out[key as keyof Parameters] = clean;
  }
  return out;
}
