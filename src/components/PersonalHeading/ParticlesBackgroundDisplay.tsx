"use client";

import { useState } from "react";

import { Particles } from "../magicui/particles";
export function ParticlesBackgroundDisplay() {
  const [color] = useState("#ffffff");

  return (
    <div className="">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={200}
        color={color}
        refresh
      />
    </div>
  );
}
