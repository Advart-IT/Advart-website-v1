"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = ["• வணக்கம்", "• ഹലോ", "• Hello"];

interface GreetingsProps {
  onComplete: () => void;
}

export default function Greetings({ onComplete }: GreetingsProps) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (index < greetings.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1000); // 1s per greeting (0.2s fade out, 0.2s fade in, 0.5s pause)

      return () => clearTimeout(timeout);
    } else {
      // End animation after slight delay for final fade out
      const endDelay = setTimeout(() => {
        setShow(false);
        onComplete();
      }, 500);
      return () => clearTimeout(endDelay);
    }
  }, [index, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={styles.container}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: "hsl(var(--color-primary))", ...styles.text }}
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
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    zIndex: 9999,
  },
  text: {
    opacity: 0,
  },
};
