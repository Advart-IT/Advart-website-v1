  // app/layout.tsx
  import type { Metadata, Viewport } from "next";
  import "./globals.css";
  import { SiteHeader } from "@/components/site-header";
  import { SiteFooter } from "@/components/site-footer";
  import ClientGreetingOverlay from "@/components/hero/common/client-greeting-overlay";
  import LenisProvider from "@/components/providers/lenis-provider";

  export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0b0f19",
  };

  export const metadata: Metadata = {
    metadataBase: new URL("https://www.advartit.in"),
    title: { default: "Advart Technologies", template: "%s | Advart Technologies" },
    description: "Advart Technologies is a digital marketing agency in Coimbatore helping brands grow through performance marketing, strategy and creative services.",
    applicationName: "Advart Technologies",
    creator: "Advart Technologies",
    publisher: "Advart Technologies",
    category: "Marketing",
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
