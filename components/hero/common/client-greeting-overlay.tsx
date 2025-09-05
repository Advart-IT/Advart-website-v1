"use client";
import { useState } from "react";
import Greetings from "./greetings";

export default function ClientGreetingOverlay() {
  const [showGreeting, setShowGreeting] = useState(true);

  return showGreeting ? (
    <Greetings onComplete={() => setShowGreeting(false)} />
  ) : null;
}