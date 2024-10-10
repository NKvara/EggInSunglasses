"use client";

import WindowManager from "@/features/desktop/components/windowManager";
import {shortcuts} from "@/features/desktop/helper/shortcuts";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export default function DesktopMain() {
  const [mouseDown, setMouseDown] = useState(false);
  const overlayDivRef = useRef<HTMLDivElement | null>(null);
  const [windows, setWindows] = useState<typeof shortcuts>([]);

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

  const handleClick = (o: (typeof shortcuts)[0]) => {
    if (windows.find((el) => el.title === o.title)) {
      document!.getElementById(o.title)!.focus();
    } else {
      setWindows([...windows, o]);
    }
  };

  return (
    <div
      ref={overlayDivRef}
      className="w-svw h-svh flex flex-col justify-between bg-indigo-200 bg-repeat bg-bottom"
      // style={{backgroundImage: `url('/images/desktop/bg.png')`}}
    >
      <div
        className="w-full h-full absolute z-50 pointer-events-none"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      />
      <div className="relative h-full w-full overflow-hidden p-6">
        <div className="flex flex-col h-full gap-2">
          {shortcuts.map((o, i) => {
            return (
              <div
                tabIndex={i}
                key={o.title}
                onDoubleClick={() => handleClick(o)}
                className="flex flex-col justify-center items-center max-w-24 w-full h-32 gap-1 group"
              >
                <div className="relative w-16 aspect-square filter">
                  <Image src={o.icon} fill alt={o.title} />
                </div>
                <div className="text-white text-center text-sm line-clamp-2 group-focus:bg-blue-600">
                  {o.title}
                </div>
              </div>
            );
          })}
        </div>
        {windows.map((o) => (
          <WindowManager
            key={o.title}
            title={o.title}
            mouseDown={mouseDown}
            init={{
              position: {x: o.init.position.x, y: o.init.position.y},
              size: {h: o.init.size.h, w: o.init.size.w}
            }}
            onClose={() => {
              setWindows(windows.filter((obj) => obj.title !== o.title));
            }}
          >
            {o.app}
          </WindowManager>
        ))}
      </div>
      {/* <div className="w-full h-12 bg-gradient-to-r from-slate-950/[0.7] via-slate-900/[0.7] to-slate-950/[0.7] backdrop-blur-3xl">
        <div className="w-4 h-4 bg-white" />
      </div> */}
    </div>
  );
}
