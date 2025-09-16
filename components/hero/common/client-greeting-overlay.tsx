"use client";

import { useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Greetings from "./greetings";

export default function ClientGreetingOverlay() {
  const pathname = usePathname();

  // ✅ Only show overlay on these routes
  const SHOW_ON = useMemo(() => new Set<string>(["/"]), []);

  // Check if current route should show greeting
  const routeAllowed = SHOW_ON.has(pathname);

  // If overlay won't render, make sure the app is visible (safety net).
  useLayoutEffect(() => {
    if (!routeAllowed) {
      const app = document.getElementById("__advart_app");
      if (app) app.style.visibility = "visible";
      const base = document.getElementById("advart-base-style");
      if (base && base.parentNode) base.parentNode.removeChild(base);
      document.documentElement.removeAttribute("data-intro");
    }
  }, [routeAllowed]);

  if (!routeAllowed) return null;

  return (
    <Greetings
      onComplete={() => {
        // No longer storing in sessionStorage - greeting will show every time
        console.log("Greeting animation completed");
      }}
    />
  );
}