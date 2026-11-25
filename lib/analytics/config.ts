export const config = {
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
  debug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true',
  google: /^G-[A-Z0-9]{4,20}$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '') ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID! : '',
  clarity: /^[a-z0-9]{5,20}$/.test(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '') ? process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID! : '',
  meta: /^\d{5,25}$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || '') ? process.env.NEXT_PUBLIC_META_PIXEL_ID! : '',
};
/** Approve campaign codes here before deployment. Arbitrary query values are never collected. */
export const campaignCodes: readonly string[] = [];
