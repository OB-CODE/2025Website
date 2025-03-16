"use client";

import { useState } from "react";
import { Particles } from "../magicui/particles";

export function ParticlesBackgroundDisplay() {
  const [color] = useState("#ffffff");

  return (
    <div className="fixed top-0 left-0 w-full h-[200vh] pointer-events-none">
      <Particles
        className="absolute inset-0 z-0 w-full h-full"
        quantity={200}
        ease={200}
        color={color}
        refresh
      />
    </div>
  );
}
