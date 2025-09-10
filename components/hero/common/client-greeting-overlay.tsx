"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Greetings from "./greetings";

const STORAGE_KEY = "advart_greeting_shown";

export default function ClientGreetingOverlay() {
  const pathname = usePathname();

  // ✅ Allow showing only on these routes (homepage by default)
  const SHOW_ON = useMemo(() => new Set<string>(["/"]), []);

  // If current route is not allowed, don't mount
  const routeAllowed = SHOW_ON.has(pathname);

  // Track whether greeting already shown this session
  const [alreadyShown, setAlreadyShown] = useState<boolean>(true);

  useEffect(() => {
    try {
      const wasShown = sessionStorage.getItem(STORAGE_KEY) === "1";
      setAlreadyShown(wasShown);
    } catch {
      // storage blocked — assume not shown
      setAlreadyShown(false);
    }
  }, []);

  if (!routeAllowed || alreadyShown) return null;

  return (
    <Greetings
      onComplete={() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      }}
    />
  );
}
