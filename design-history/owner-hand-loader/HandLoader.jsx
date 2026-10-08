"use client";
// React / Next.js wrapper. Keep hand-loader.js next to this file and render <HandLoader name="..." /> once in your root layout.
import { useEffect } from "react";
import "./hand-loader.js";

export default function HandLoader(props) {
  useEffect(() => {
    const ctl = window.HandLoader.start(props);
    return () => ctl.skip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
