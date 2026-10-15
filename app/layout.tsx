  // app/layout.tsx
  import type { Metadata, Viewport } from "next";
  import "./globals.css";
  import { SiteHeader } from "@/components/site-header";
  import { SiteFooter } from "@/components/site-footer";
  import ClientGreetingOverlay from "@/components/hero/common/client-greeting-overlay";
  import LenisProvider from "@/components/providers/lenis-provider";

  const SITE_NAME = "Advart Technologies";
  const LEGAL_NAME = "Advart Technologies Pvt Ltd";
  const TAGLINE = "ROI-Focused Digital Marketing Agency in Coimbatore";
  const DOMAIN = "https://www.advartit.in";
  const OG_IMAGE = `${DOMAIN}/og.jpg`;
  const LOGO = `${DOMAIN}/logo.png`;

  const isProd = process.env.NODE_ENV === "production";

  export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0b0f19",
  };

  export const metadata: Metadata = {
    metadataBase: isProd ? new URL(DOMAIN) : undefined,
    title: {
      default: `${SITE_NAME} | ${TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Advart Technologies is a Coimbatore-based digital marketing agency specializing in SEO, PPC, social media, and web design to grow your business.",
    keywords: [
      "digital marketing Coimbatore",
      "digital marketing agency Coimbatore",
      "SEO Coimbatore",
      "Google Ads Coimbatore",
      "social media marketing Coimbatore",
      "website design Coimbatore",
      "performance marketing",
      "content marketing",
      "local SEO",
      "Advart Technologies",
    ],
    applicationName: SITE_NAME,
    authors: [{ name: LEGAL_NAME }],
    creator: LEGAL_NAME,
    publisher: LEGAL_NAME,
    category: "Marketing",
    alternates: { canonical: "/", languages: { "en-IN": "/" } },
    openGraph: {
      type: "website",
      url: DOMAIN,
      title: `${SITE_NAME} — ${TAGLINE}`,
      siteName: SITE_NAME,
      description:
        "Full-funnel digital marketing services in Coimbatore: SEO, PPC, social media, and web design to grow your business.",
      locale: "en_IN",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — ${TAGLINE}` }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0b0f19" }],
    },
    manifest: "/site.webmanifest",
  };

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en-IN" dir="ltr">
        <body className="bg-[#F6F7F9] text-black">
          <LenisProvider>
            {/* NOTE: app is visible from first paint, so it's ready under the overlay */}
            <div id="__advart_app" className="app-shell flex flex-col min-h-[100dvh]">
              <SiteHeader />
              <main className="flex-1 min-h-[100dvh]">{children}</main>
              <SiteFooter />
            </div>

            {/* Overlay sits on top but background is transparent, so the homepage is visible */}
            <ClientGreetingOverlay />
          </LenisProvider>
        </body>
      </html>
    );
  }
