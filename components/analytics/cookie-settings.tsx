'use client';
import { config } from '@/lib/analytics/config';

export default function CookieSettings() {
  if (!config.enabled) return null;
  return <button type="button" data-analytics-ignore="true" className="min-h-11 text-left text-black/70 transition-colors hover:text-black" onClick={() => window.dispatchEvent(new Event('advart:preferences'))}>Cookie Settings</button>;
}
