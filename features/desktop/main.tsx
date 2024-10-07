"use client";

import WindowManager from "@/features/desktop/components/windowManager";
import {shortcuts} from "@/features/desktop/helper/shortcuts";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export default function DesktopMain() {
  const [mouseDown, setMouseDown] = useState(false);
  const overlayDivRef = useRef<HTMLDivElement | null>(null);
  const [windows, setWindows] = useState([
    {title: "title", app: <div />, id: 0, icon: ""}
  ]);

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

  const handleClick = (o: (typeof windows)[0]) => {
    setWindows([...windows, o]);
  };

  return (
    <div
      ref={overlayDivRef}
      className="w-svw h-svh flex flex-col justify-between bg-cover bg-bottom"
      style={{backgroundImage: `url('/images/desktop/background.gif')`}}
    >
      <div
        className="w-full h-full absolute z-50 pointer-events-none"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      />
      <div className="relative h-full w-full overflow-hidden p-4">
        <div className="flex flex-col h-full gap-2">
          {shortcuts.map((o) => (
            <div
              key={o.id}
              onClick={() => handleClick(o)}
              className="flex flex-col justify-center items-center w-16 h-32 gap-1"
            >
              <div className="relative w-full aspect-square ">
                <Image src={o.icon} fill alt={o.title} />
              </div>
            </div>
          ))}
        </div>
        {windows.map((o) => (
          <WindowManager key={o.id} title={o.title} mouseDown={mouseDown}>
            {o.app}
          </WindowManager>
        ))}
      </div>
      <div className="w-full h-12 bg-gradient-to-r from-slate-950/[0.8] via-slate-900/[0.8] to-slate-950/[0.8] backdrop-blur-3xl">
        <div className="w-4 h-4 bg-white" />
      </div>
    </div>
  );
}
