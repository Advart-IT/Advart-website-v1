import { mapping, type EventName } from '../events';
import type { Consent } from '../types';
export function prepareClarity(consent: Consent) {
  if (!window.clarity) {
    const clarity: NonNullable<Window['clarity']> = (...args: unknown[]) => {
      if (clarity.q!.length < 60) clarity.q!.push(args);
    };
    clarity.q = [];
    window.clarity = clarity;
  }
  clarityConsent(consent);
}
export function clarityConsent(consent: Consent) {
  window.clarity?.('consentv2', { analytics_Storage: consent.analytics ? 'granted' : 'denied', ad_Storage: consent.marketing ? 'granted' : 'denied' });
}
export function clarityEvent(event: EventName) {
  const name = mapping(event).clarity;
  if (name) window.clarity?.('event', name);
}
