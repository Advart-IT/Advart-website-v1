import type { Metadata } from "next/types";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import LenisProvider from "@/components/lenis-provider";
import ClientGreetingOverlay from "@/components/hero/common/client-greeting-overlay";

export const metadata: Metadata = {
  title: "Advart",
  description: "A marketing website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Updated approach: Only control scroll, keep content visible */}
        <style id="advart-base-style">{`
          html[data-intro="1"] body{
            overflow:hidden;
            position:fixed;
            width:100%;
            height:100%;
          }
          #__advart_app{
            visibility:visible;
            opacity:1;
          }
          /* Ensure content is ready during greeting */
          .app-shell{
            transform:translateZ(0);
            will-change:auto;
          }
        `}</style>

        {/* Simplified bootstrap script - just handle scroll locking */}
        <script
          id="advart-intro-bootstrap"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    var legacyType = (performance && performance.navigation && performance.navigation.type === 1) ? 'reload' : 'navigate';
    var navType = (navEntry && navEntry.type) || legacyType;
    var isReload = navType === 'reload';

    var hasVisitedThisTab = sessionStorage.getItem('advart:visited') === '1';
    var urlParams = new URLSearchParams(location.search);
    var forceIntro = urlParams.get('intro') === '1';

    var shouldShow = forceIntro || isReload || !hasVisitedThisTab;

    var html = document.documentElement;
    if (shouldShow) {
      html.setAttribute('data-intro', '1');
      sessionStorage.setItem('advart:visited', '1');
      // Lock scroll immediately but keep content visible
      document.body && (document.body.style.overflow = 'hidden');
      document.body && (document.body.style.position = 'fixed');
      document.body && (document.body.style.width = '100%');
      document.body && (document.body.style.height = '100%');
    } else {
      html.setAttribute('data-intro', '0');
    }

    window.addEventListener('pageshow', function (e) {
      if (e.persisted && shouldShow) {
        html.setAttribute('data-intro', '1');
        document.body && (document.body.style.overflow = 'hidden');
        document.body && (document.body.style.position = 'fixed');
      }
    });
  } catch(e){
    // Fail gracefully
    console.warn('Intro script failed:', e);
  }
})();
          `,
          }}
        />
      </head>

      <body className="bg-[#F6F7F9] text-black">
        {/* Content renders immediately and is always visible */}
        <div id="__advart_app" className="app-shell flex flex-col min-h-[100dvh]">
          <LenisProvider>
            <SiteHeader />
            <main className="flex-1 min-h-[100dvh]">{children}</main>
            <SiteFooter />
          </LenisProvider>
        </div>

        {/* Greeting overlay renders on top, doesn't hide content */}
        <ClientGreetingOverlay />
      </body>
    </html>
  );
}