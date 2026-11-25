import { config } from '../config';
import { mapping, type EventName } from '../events';
import type { Parameters } from '../types';
export function prepareMeta() {
  if (window.fbq) return;
  const pixel: NonNullable<Window['fbq']> = Object.assign(function (...args: unknown[]) {
    if (pixel.callMethod) pixel.callMethod(...args);
    else if (pixel.queue.length < 60) pixel.queue.push(args);
  }, { queue: [] as unknown[][], loaded: true, version: '2.0', disablePushState: true });
  pixel.push = pixel;
  window.fbq = window._fbq = pixel;
}
export function initMeta() {
  window.fbq?.('set', 'autoConfig', false, config.meta);
  window.fbq?.('init', config.meta);
  window.fbq?.('consent', 'grant');
}
export function metaEvent(event: EventName, params: Parameters) {
  const map = mapping(event);
  window.fbq?.(map.metaMethod, map.meta, params);
}
