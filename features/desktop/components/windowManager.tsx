"use client";

import useMousePosition from "@/features/hooks/useMousePosition";
import {ReactNode, useRef, useState} from "react";
import {useHover} from "usehooks-ts";
import {motion} from "framer-motion";
import Toolbar from "@/features/desktop/components/toolbar";
import {useInitials} from "@/features/desktop/components/hooks/setInitials";
import {edgeSides, useEdge} from "@/features/desktop/components/hooks/isEdge";
import {min} from "@/features/desktop/components/types";
import {useWindowResize} from "@/features/desktop/components/hooks/useWindowResize";
import {useWindowDrag} from "@/features/desktop/components/hooks/useWindowDrag";
import {useResizeCursor} from "@/features/desktop/components/hooks/useResizeCursor";

export default function WindowManager({
  children,
  mouseDown,
  title,
  init,
  min,
  onClose,
  gIndexCount,
  setGIndexCount
}: {
  children: ReactNode;
  mouseDown: boolean;
  title: string;
  init?: {position?: {x: number; y: number}};
  min: min;
  onClose: () => void;
  gIndexCount: number;
  setGIndexCount: () => void;
}) {
  const [indexCount, setIndexCount] = useState(gIndexCount);
  const [windowSize, setWindowSize] = useState({
    h: min.size.h,
    w: min.size.w
  });
  const [windowPosition, setWindowPosition] = useState({
    x: init?.position?.x || 0,
    y: init?.position?.y || 0
  });
  const [initialPosition, setInitialPosition] = useState({
    div: {
      x: windowPosition.x,
      y: windowPosition.y,
      r: windowSize.w,
      b: windowSize.h
    },
    cursor: {x: 0, y: 0},
    window: {h: windowSize.h, w: windowSize.w}
  });
  const mousePosition = useMousePosition();
  const [moveEnable, setMoveEnable] = useState(false);
  const [drag, setDrag] = useState(edgeSides.none);

  const [close, setClose] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(mainRef);

  const isEdge = useEdge({
    isHover,
    mousePosition,
    moveEnable,
    windowPosition,
    windowSize
  });

  const setInitials = useInitials({
    mainRef,
    mousePosition,
    windowSize,
    setInitialPosition,
    setWindowSize
  });

  useWindowDrag({
    initialPosition,
    mouseDown,
    mousePosition,
    moveEnable,
    setInitials,
    setMoveEnable,
    setWindowPosition
  });

  useResizeCursor({drag, mouseDown, isEdge, setDrag, setInitials});

  useWindowResize({
    drag,
    initialPosition,
    min,
    mousePosition,
    windowPosition,
    windowSize,
    setWindowSize,
    setWindowPosition
  });

  return (
    <div>
      {mouseDown && drag && (
        <div
          className="fixed top-0 left-0 z-[9999] w-svw h-svh"
          style={{cursor: drag}}
        />
      )}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: close ? 0 : 1}}
        onAnimationComplete={() => close && onClose()}
        id={title}
        ref={mainRef}
        tabIndex={0}
        className="absolute flex flex-col p-[2px] bg-black group"
        onMouseDown={(e) => {
          setIndexCount(gIndexCount);
          setGIndexCount();
          if (isEdge() !== "") {
            setInitials(e.currentTarget.getBoundingClientRect());
          }
        }}
        style={{
          width: windowSize.w,
          height: windowSize.h,
          top: windowPosition.y,
          left: windowPosition.x,
          minHeight: min.size.h,
          minWidth: min.size.w,
          cursor: drag || isEdge(),
          zIndex: 20 + indexCount
        }}
      >
        <Toolbar
          isEdge={isEdge() === ""}
          setClose={setClose}
          setInitials={setInitials}
          setMoveEnable={setMoveEnable}
          title={title}
        />
        {children}
      </motion.div>
    </div>
  );
}
