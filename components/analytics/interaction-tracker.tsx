'use client';
import { useEffect } from 'react';
import { beginVisit, trackEvent } from '@/lib/analytics';
import { isEvent, type EventName } from '@/lib/analytics/events';
import { safePath } from '@/lib/analytics/privacy';
import type { Parameters } from '@/lib/analytics/types';

function attributes(el: HTMLElement): Parameters {
  return { section_name: el.dataset.trackSection || el.closest<HTMLElement>('[data-track-section]')?.dataset.trackSection,
    button_name: el.dataset.trackName, placement: el.dataset.trackPlacement,
    content_name: el.dataset.trackContent, job_id: el.dataset.trackJob };
}
export default function InteractionTracker({ visitKey, revision }: { visitKey: string; revision: number }) {
  useEffect(() => {
    // Child effects run before the route tracker's effect; establish the visit before scanning media.
    beginVisit(visitKey);
    let frame = 0;
    const click = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || e.target.closest('[data-analytics-ignore]')) return;
      const el = e.target.closest<HTMLElement>('[data-track-event], a[href]');
      if (!el) return;
      const params = attributes(el);
      let event: EventName | undefined;
      const href = el.getAttribute('href');
      if (href) {
        try {
          const u = new URL(href, location.href);
          params.destination_type = u.protocol === 'tel:' ? 'phone' : u.protocol === 'mailto:' ? 'email' : u.origin === location.origin ? 'internal' : 'external';
          if (u.origin === location.origin) params.destination_path = safePath(u.pathname);
          if (u.protocol === 'tel:') event = 'phone_click';
          else if (u.protocol === 'mailto:') event = 'email_click';
          else if (!['http:', 'https:'].includes(u.protocol)) return;
          else if (/^(maps\.app\.goo\.gl|maps\.google\.com)$/.test(u.hostname) || u.hostname === 'www.google.com' && u.pathname === '/maps') event = 'map_click';
          else if (/(^|\.)(linkedin\.com|instagram\.com|facebook\.com|youtube\.com)$/.test(u.hostname)) event = 'social_link_click';
          else if (el.querySelector('img') && u.pathname === '/' && u.origin === location.origin) event = 'logo_click';
          else if (el.closest('footer')) event = 'footer_link_click';
          else if (el.closest('nav')) event = 'navigation_click';
          else event = u.origin === location.origin ? 'internal_link_click' : 'external_link_click';
        } catch { return; }
      }
      const explicit = el.dataset.trackEvent;
      if (explicit && isEvent(explicit)) event = explicit;
      if (!event) return;
      trackEvent(event, params);
      // Deliberate non-conversion aggregate dimensions; explicit event replaces automatic link event.
      if (el.dataset.trackCta === 'true') {
        if (event !== 'cta_click') trackEvent('cta_click', params);
        if (location.pathname === '/') trackEvent('homepage_cta_click', params);
      }
    };
    const focus = (e: FocusEvent) => {
      if (!(e.target instanceof Element)) return;
      const form = e.target.closest<HTMLElement>('[data-track-form]');
      if (!form) return;
      const name = form.dataset.trackForm!;
      trackEvent(name === 'contact' ? 'contact_form_start' : 'application_form_start', { form_name: name }, { once: `form:${name}` });
    };
    const media = (e: Event) => {
      if (!(e.target instanceof HTMLVideoElement)) return;
      const video = e.target;
      if (!video.dataset.trackVideo || !video.getClientRects().length || video.closest('[aria-hidden="true"]')) return;
      const event = e.type === 'play' ? 'video_play' : e.type === 'ended' ? 'video_complete' : 'video_pause';
      if (e.type === 'pause' && video.ended) return;
      trackEvent(event, { video_name: video.dataset.trackVideo, video_progress: Number.isFinite(video.duration) && video.duration > 0 ? Math.round(video.currentTime / video.duration * 100) : 0 }, { once: `${video.dataset.trackVideo}:${event}` });
    };
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const height = document.documentElement.scrollHeight - innerHeight;
        if (height <= 0) return;
        const percent = scrollY / height * 100;
        for (const n of [25, 50, 75, 90]) if (percent >= n) trackEvent('scroll_depth', { scroll_percentage: n }, { once: String(n) });
      });
    };
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15 || el.closest('[aria-hidden="true"]')) continue;
        const name = el.dataset.trackSection || el.dataset.trackContent;
        if (!name) continue;
        const params = attributes(el);
        trackEvent('section_view', params, { once: name });
        for (const event of (el.dataset.trackView || '').split(' ')) if (isEvent(event)) trackEvent(event, params, { once: name });
      }
    }, { threshold: [0.15] }) : null;
    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-track-view], section[data-track-section]').forEach(el => observer?.observe(el));
      root.querySelectorAll<HTMLVideoElement>('video[data-track-video]').forEach(video => {
        if (!video.paused && video.currentTime > 0) media({ type: 'play', target: video } as unknown as Event);
      });
    };
    scan(document);
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of Array.from(record.removedNodes)) if (node instanceof HTMLElement) { observer?.unobserve(node); node.querySelectorAll('[data-track-view], section[data-track-section]').forEach(el => observer?.unobserve(el)); }
        for (const node of Array.from(record.addedNodes)) if (node instanceof HTMLElement) {
          if (node.matches('[data-track-view], section[data-track-section]')) observer?.observe(node);
          scan(node);
        }
      }
    });
    mutations.observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
    document.addEventListener('click', click, true);
    document.addEventListener('focusin', focus);
    for (const event of ['play', 'pause', 'ended']) document.addEventListener(event, media, true);
    window.addEventListener('scroll', scroll, { passive: true }); scroll();
    return () => {
      cancelAnimationFrame(frame); observer?.disconnect(); mutations.disconnect();
      document.removeEventListener('click', click, true); document.removeEventListener('focusin', focus);
      for (const event of ['play', 'pause', 'ended']) document.removeEventListener(event, media, true);
      window.removeEventListener('scroll', scroll);
    };
  }, [visitKey, revision]);
  return null;
}
