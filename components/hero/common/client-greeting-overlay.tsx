"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Greetings from "./greetings";

export default function ClientGreetingOverlay() {
  const pathname = usePathname();
  // The root layout persists across navigation; a full reload resets this state.
  const [introActive, setIntroActive] = useState(() => pathname === "/");
  const showGreeting = introActive && pathname === "/";

  useLayoutEffect(() => {
    if (!showGreeting) {
      // Leaving Home also consumes the intro, even if it hasn't finished yet.
      setIntroActive(false);
      const app = document.getElementById("__advart_app");
      if (app) app.style.visibility = "visible";
    }
  }, [showGreeting]);

  if (!showGreeting) return null;

  return <Greetings onComplete={() => setIntroActive(false)} />;
}
