"use client";

import WindowManager from "@/features/desktop/components/windowManager";
import {shortcuts} from "@/features/desktop/helper/shortcuts";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export default function DesktopMain() {
  const [mouseDown, setMouseDown] = useState(false);
  const overlayDivRef = useRef<HTMLDivElement | null>(null);
  const [windows, setWindows] = useState<typeof shortcuts>([]);
  const [gIndexCount, setGIndexCount] = useState(0);

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
      className="w-svw h-svh flex flex-col justify-between bg-EWhite"
      // style={{backgroundImage: `url('/images/desktop/cement.jpg')`}}
    >
      <div className="relative h-full w-full overflow-hidden p-6">
        <div className="flex flex-col items-end h-full gap-8">
          {shortcuts.map((o, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isFocused, setIsFocused] = useState(false);
            return (
              <div
                tabIndex={i}
                key={o.title}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex flex-col justify-center items-center max-w-24 w-full h-16 gap-1 group select-none"
              >
                <div
                  className="relative w-8 aspect-square cursor-pointer"
                  onDoubleClick={() => handleClick(o)}
                >
                  <Image
                    src={o.icon}
                    fill
                    alt={o.title}
                    style={{
                      filter: isFocused
                        ? "brightness(.5) sepia(100%) saturate(8)"
                        : ""
                    }}
                  />
                </div>
                <div
                  className="text-black text-center text-xs line-clamp-2 group-focus:bg-EOrange cursor-pointer"
                  onDoubleClick={() => handleClick(o)}
                >
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
            gIndexCount={gIndexCount}
            setGIndexCount={() => setGIndexCount(gIndexCount + 1)}
            init={{
              position: {x: o.init.position.x, y: o.init.position.y}
            }}
            min={{
              size: {w: o.minSize.w, h: o.minSize.h}
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
