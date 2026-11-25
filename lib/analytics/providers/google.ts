import { config } from '../config';
import { mapping, type EventName } from '../events';
import type { Parameters } from '../types';
export function prepareGoogle() {
  window.dataLayer ||= [];
  window.gtag ||= function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
}
export function googleConsent(granted: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${config.google}`] = !granted;
  window.gtag?.('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
}
export function initGoogle(params: Parameters) {
  window.gtag?.('js', new Date());
  window.gtag?.('config', config.google, { ...params, send_page_view: false, page_referrer: '', allow_google_signals: false, allow_ad_personalization_signals: false });
}
export function googleEvent(event: EventName, params: Parameters) {
  window.gtag?.('event', mapping(event).google, { ...params, page_referrer: '', send_to: config.google, ...(config.debug ? { debug_mode: true } : {}), ...(event === 'product_view' ? { items: [{ item_id: params.content_name || 'product', item_name: params.content_name || 'product' }] } : {}) });
}
