"use client";

import WindowManager from "@/features/desktop/components/windowManager";
import {useEffect, useRef, useState} from "react";

export default function DesktopMain() {
  const [mouseDown, setMouseDown] = useState(false);
  const overlayDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDownOverlay = () => {
      setMouseDown(true);
    };
    const handleMouseUpOverlay = () => {
      setMouseDown(false);
    };

    const overlayDiv = overlayDivRef.current;
    if (overlayDiv) {
      overlayDiv.addEventListener("mousedown", handleMouseDownOverlay);
      overlayDiv.addEventListener("mouseup", handleMouseUpOverlay);
    }

    return () => {
      if (overlayDiv) {
        overlayDiv.removeEventListener("mousedown", handleMouseDownOverlay);
        overlayDiv.removeEventListener("mouseup", handleMouseUpOverlay);
      }
    };
  }, []);

  return (
    <div
      ref={overlayDivRef}
      className="w-svw h-svh flex flex-col justify-between bg-cover bg-bottom"
      style={{backgroundImage: `url('/images/desktop/background.png')`}}
    >
      <div
        className="w-full h-full absolute z-50 pointer-events-none"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      />
      <div className="relative h-full w-full overflow-hidden">
        <WindowManager mouseDown={mouseDown} />
      </div>
      <div className="w-full h-12 bg-gradient-to-r from-slate-950/[0.8] via-slate-900/[0.8] to-slate-950/[0.8] backdrop-blur-3xl">
        <div className="w-4 h-4 bg-white" />
      </div>
    </div>
  );
}
