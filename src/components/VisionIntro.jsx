"use client";
// Adapter for the owner's unchanged loader. Load only in the browser because its IIFE uses window.
import { useEffect } from "react";
export default function VisionIntro() {
  useEffect(() => {
    let active = true, ctl, raf, last = null;
    const sample = () => { const svg = document.querySelector(".hl__hand"); if(svg){const b=svg.getBoundingClientRect();last=[...svg.querySelectorAll(".hl__dot")].map(c=>({x:b.left+Number(c.getAttribute("cx"))/100*b.width,y:b.top+Number(c.getAttribute("cy"))/100*b.height}));} raf=requestAnimationFrame(sample); };
    import("./hand-loader.js").then(() => {
      if (active) { raf=requestAnimationFrame(sample); ctl = window.HandLoader.start({ name: "Vignesh B S", oncePerSession: false, onDone: () => { cancelAnimationFrame(raf); window.dispatchEvent(new CustomEvent("portfolio-hand-seed",{detail:last})); } }); }
    });
    return () => { active = false; cancelAnimationFrame(raf); if (ctl) ctl.skip(); };
  }, []);
  return null;
}
