  // app/layout.tsx
  import type { Metadata, Viewport } from "next";
  import "./globals.css";
  import { SiteHeader } from "@/components/site-header";
  import { SiteFooter } from "@/components/site-footer";
  import ClientGreetingOverlay from "@/components/hero/common/client-greeting-overlay";
  import LenisProvider from "@/components/providers/lenis-provider";
  import Script from "next/script";

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
      <html lang="en-IN" dir="ltr" data-intro>
        <head>
          {/* Keep body scroll locked during intro (no white screen — app stays visible) */}
          <style
            id="advart-base-style"
            dangerouslySetInnerHTML={{
              __html: `
                html[data-intro] body{overflow:hidden}
              `,
            }}
          />
          {/* Decide overlay vs no overlay before first paint (no flash) */}
          <Script
            id="advart-pre-intro"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  try{
                    var STORAGE_KEY="advart_greeting_shown";
                    var SHOW_ON=["/"];
                    var path=location.pathname;
                    var greetingShown=sessionStorage.getItem(STORAGE_KEY)==="1";
                    var shouldShow = SHOW_ON.indexOf(path)!==-1 && !greetingShown;

                    if(!shouldShow){
                      // No intro: clean up and allow scrolling
                      var base=document.getElementById("advart-base-style");
                      if(base && base.parentNode) base.parentNode.removeChild(base);
                      document.documentElement.removeAttribute("data-intro");
                    } else {
                      // Intro mode: keep scroll locked and at top
                      document.documentElement.setAttribute("data-intro","");
                      window.scrollTo({top:0});
                      if ("scrollRestoration" in history) { history.scrollRestoration="manual"; }
                    }
                  }catch(e){
                    // Fail open: ensure normal page
                    var base=document.getElementById("advart-base-style");
                    if(base && base.parentNode) base.parentNode.removeChild(base);
                    document.documentElement.removeAttribute("data-intro");
                  }
                })();
              `,
            }}
          />
        </head>
        <body className="bg-[#F6F7F9] text-black">
          <Script
          id="advart-pre-intro"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try{
                  var SHOW_ON=["/"];
                  var path=location.pathname;
                  var shouldShow = SHOW_ON.indexOf(path)!==-1;

                  if(!shouldShow){
                    // No intro: clean up and allow scrolling
                    var base=document.getElementById("advart-base-style");
                    if(base && base.parentNode) base.parentNode.removeChild(base);
                    document.documentElement.removeAttribute("data-intro");
                  } else {
                    // Intro mode: keep scroll locked and at top
                    document.documentElement.setAttribute("data-intro","");
                    window.scrollTo({top:0});
                    if ("scrollRestoration" in history) { history.scrollRestoration="manual"; }
                  }
                }catch(e){
                  // Fail open: ensure normal page
                  var base=document.getElementById("advart-base-style");
                  if(base && base.parentNode) base.parentNode.removeChild(base);
                  document.documentElement.removeAttribute("data-intro");
                }
              })();
            `,
          }}
        />

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
