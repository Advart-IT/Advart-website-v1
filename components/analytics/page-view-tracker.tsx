'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { beginVisit, trackEvent } from '@/lib/analytics';
import { campaigns } from '@/lib/analytics/privacy';
import type { EventName } from '@/lib/analytics/events';
import InteractionTracker from './interaction-tracker';
export default function PageViewTracker() {
  const path = usePathname();
  const search = useSearchParams();
  const key = path + JSON.stringify(campaigns(search.toString()));
  const [revision, setRevision] = useState(0);
  useEffect(() => { const changed = () => setRevision(v => v + 1); window.addEventListener('advart:consent', changed); return () => window.removeEventListener('advart:consent', changed); }, []);
  useEffect(() => {
    beginVisit(key);
    const event: EventName | undefined = ({ '/': 'homepage_view', '/aboutus': 'about_page_view', '/advartgen': 'advartgen_page_view', '/careers': 'careers_page_view', '/contactus': 'contact_page_view' } as Record<string, EventName>)[path];
    if (event) trackEvent(event, {}, { once: 'route' });
    if (path === '/dot') trackEvent('product_view', { content_name: 'dot' }, { once: 'dot' });
  }, [key, path, revision]);
  return <InteractionTracker visitKey={key} revision={revision} />;
}
