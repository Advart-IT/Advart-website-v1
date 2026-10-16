import type { Metadata } from "next";

export const SITE_URL = "https://www.advartit.in";
const socialImage = { url: "/social-preview.png", width: 1200, height: 630, alt: "Advart Technologies — Performance Marketing Agency in Coimbatore" };

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website", url: path, siteName: "Advart Technologies", locale: "en_IN",
      title, description, images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

// Business details match the public footer. No unverified legal name or credentials.
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService", "@id": `${SITE_URL}/#organization`,
      name: "Advart Technologies", alternateName: "Advart", url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-1.png`, image: `${SITE_URL}/social-preview.png`,
      telephone: "+919600506015", email: "digital@advartit.in",
      address: {
        "@type": "PostalAddress", streetAddress: "105/101, Bharathi Colony Rd, Peelamedu",
        addressLocality: "Coimbatore", addressRegion: "Tamil Nadu", postalCode: "641004", addressCountry: "IN",
      },
      brand: { "@type": "Brand", name: "Advart Gen", alternateName: "AdvartGen", url: `${SITE_URL}/advartgen` },
      sameAs: ["https://www.linkedin.com/company/advarttechnologies/"],
    },
    {
      "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`,
      name: "Advart Technologies", alternateName: "Advart", inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service", "@id": `${SITE_URL}/#performance-marketing`,
      name: "Performance Marketing", serviceType: "Performance marketing",
      url: `${SITE_URL}/#services`, provider: { "@id": `${SITE_URL}/#organization` },
      description: "Data-driven performance marketing for ecommerce growth, combining targeted advertising, campaign strategy, analytics and conversion optimisation with a focus on ROI.",
    },
    {
      "@type": "Service", "@id": `${SITE_URL}/advartgen#service`,
      name: "Advart Gen", alternateName: "AdvartGen",
      serviceType: "AI-powered ecommerce product photography",
      url: `${SITE_URL}/advartgen`, provider: { "@id": `${SITE_URL}/#organization` },
      description: "Managed AI product image production for ecommerce and fashion brands, transforming existing product photos into catalogue, model and lifestyle visuals.",
    },
  ],
};
