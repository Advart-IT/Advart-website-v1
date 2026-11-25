export type Consent = { analytics: boolean; marketing: boolean };
export type Provider = 'google' | 'clarity' | 'meta';
export type Parameters = Partial<Record<
  'page_path' | 'page_title' | 'page_location' | 'section_name' | 'button_name' | 'placement' |
  'destination_type' | 'destination_path' | 'form_name' | 'lead_type' | 'content_name' |
  'content_category' | 'job_id' | 'scroll_percentage' | 'video_name' | 'video_progress' |
  'device_type' | 'error_code' | 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term', string | number>>;
type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push?: Pixel; loaded: boolean; version: string; disablePushState: boolean };
type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: Clarity;
    fbq?: Pixel;
    _fbq?: Pixel;
  }
}
