/** Only events with an existing trigger belong here. */
export const events = [
  'page_view', 'navigation_click', 'mobile_menu_open', 'mobile_menu_close', 'logo_click',
  'cta_click', 'internal_link_click', 'external_link_click', 'footer_link_click', 'social_link_click',
  'scroll_depth', 'section_view', 'video_play', 'video_pause', 'video_complete',
  'homepage_view', 'hero_contact_click', 'service_view', 'service_click', 'portfolio_view', 'portfolio_click', 'homepage_cta_click',
  'about_page_view', 'about_section_view', 'team_section_view',
  'advartgen_page_view', 'product_view', 'feature_view', 'feature_click', 'pricing_view', 'advartgen_cta_click', 'gallery_view', 'gallery_item_click', 'product_cta_click',
  'contact_page_view', 'contact_form_start', 'contact_form_submit', 'contact_form_success', 'contact_form_error',
  'phone_click', 'email_click', 'map_click', 'demo_request_success',
  'careers_page_view', 'job_listing_view', 'job_detail_view', 'job_apply_click', 'application_form_start',
  'resume_upload_success', 'job_application_submit', 'job_application_success', 'job_application_error',
] as const;
export type EventName = typeof events[number];
export function isEvent(value: string): value is EventName { return (events as readonly string[]).includes(value); }
const standard: Partial<Record<EventName, string>> = { page_view: 'PageView', product_view: 'ViewContent', contact_form_success: 'Lead', demo_request_success: 'Lead' };
export function mapping(event: EventName) {
  const error = event === 'contact_form_error' || event === 'job_application_error';
  return {
    google: event === 'product_view' ? 'view_item' : event === 'contact_form_success' || event === 'demo_request_success' ? 'generate_lead' : error ? 'form_submit_error' : event,
    clarity: event === 'page_view' ? null : error ? 'form_submit_error' : event,
    meta: standard[event] || (error ? 'FormSubmitError' : event.split('_').map(s => s === 'cta' ? 'CTA' : s[0].toUpperCase() + s.slice(1)).join('')),
    metaMethod: standard[event] ? 'track' as const : 'trackCustom' as const,
  };
}
