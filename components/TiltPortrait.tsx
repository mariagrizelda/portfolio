"use client";

import { useRef } from "react";

// Tilts its children toward the cursor, with a soft glare that follows it.
export default function TiltPortrait({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    for (const p of ["--rx", "--ry", "--gx", "--gy"]) el.style.removeProperty(p);
  }

  return (
    <div className="tilt-stage">
      <div ref={ref} className="hero-portrait" onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
        <div className="tilt-glare" aria-hidden />
      </div>
    </div>
  );
}
