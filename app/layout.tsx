// import type { Metadata } from "next/types";
// import "./globals.css";
// import { SiteHeader } from "@/components/site-header";
// import { SiteFooter } from "@/components/site-footer";
// import ClientGreetingOverlay from "@/components/hero/common/client-greeting-overlay";

// export const metadata: Metadata = {
//   title: "Advart",
//   description: "A marketing website built with Next.js and Tailwind CSS.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className="bg-[#F6F7F9] text-black">
//         <div
//           id="__advart_app"
//           className="app-shell flex flex-col min-h-[100dvh]"
//         >
//           <SiteHeader />
//           <main className="flex-1 min-h-[100dvh]">
//             {children}
//           </main>
//           <SiteFooter />
//         </div>

//         <ClientGreetingOverlay />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next/types";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Advart",
  description: "A marketing website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#F6F7F9] text-black">
        <div
          id="__advart_app"
          className="app-shell flex flex-col min-h-[100dvh]"
        >
          <SiteHeader />
          <main className="flex-1 min-h-[100dvh]">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
