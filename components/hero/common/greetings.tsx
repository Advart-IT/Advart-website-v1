"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = ["• வணக்கம்", "• ഹലോ", "• Hello", "• नमस्ते"];

interface GreetingsProps {
  onComplete: () => void;
  speed?: number;    // duration per greeting in ms
  exitDelay?: number; // delay before finish after last greeting
}

export default function Greetings({ onComplete, speed = 500, exitDelay = 300 }: GreetingsProps) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  // Lock scroll & avoid scroll restore during intro
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevScrollRestoration = (history as any).scrollRestoration;

    document.body.style.overflow = "hidden";
    (history as any).scrollRestoration = "manual";
    window.scrollTo({ top: 0 });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow || "";
      (history as any).scrollRestoration = prevScrollRestoration || "auto";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Step through the greetings, then finish
  useEffect(() => {
    if (index < greetings.length) {
      const t = setTimeout(() => setIndex((p) => p + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => finish(), exitDelay);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, speed, exitDelay]);

  function finish() {
    setShow(false);

    // Wait for the slide-up animation to complete before cleaning up
    setTimeout(() => {
      // Reveal the app shell after animation
      const root = document.documentElement;
      root.removeAttribute("data-intro");
      document.body.style.overflow = "";

      const app = document.getElementById("__advart_app");
      if (app) app.style.visibility = "visible";

      // Clean up the base style if present
      const base = document.getElementById("advart-base-style");
      if (base && base.parentNode) base.parentNode.removeChild(base);

      onComplete();
    }, 600); // Match the exit animation duration
  }

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="container"
          initial={{ y: 0 }}
          exit={{
            y: "-100vh",
            transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] },
          }}
          style={styles.container}
          aria-modal
          role="dialog"
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ color: "#FFDC38", ...styles.text }}
            className="font-normal"
          >
            {greetings[index]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    zIndex: 9999,
  },
  text: { textAlign: "center" },
};
