"use client";

import useMousePosition from "@/features/hooks/useMousePosition";
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {useHover} from "usehooks-ts";
import {
  DRAG_PIXELS,
} from "@/features/desktop/helper/const";
import {motion} from "framer-motion";
import Toolbar from "@/features/desktop/components/toolbar";

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
  min: {size: {w: number; h: number}};
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
  const [drag, setDrag] = useState("");

  const [close, setClose] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(mainRef);

  const isEdge = useCallback(() => {
    if (isHover && !moveEnable) {
      const left =
        mousePosition.x >= windowPosition.x &&
        mousePosition.x <= windowPosition.x + DRAG_PIXELS;
      const right =
        mousePosition.x >= windowPosition.x + windowSize.w - DRAG_PIXELS &&
        mousePosition.x <= windowPosition.x + windowSize.w;
      const top =
        mousePosition.y >= windowPosition.y &&
        mousePosition.y <= windowPosition.y + DRAG_PIXELS;
      const bottom =
        mousePosition.y >= windowPosition.y + windowSize.h - DRAG_PIXELS &&
        mousePosition.y <= windowPosition.y + windowSize.h;

      switch (true) {
        case top && right:
          return "ne-resize";
        case bottom && right:
          return "se-resize";
        case bottom && left:
          return "sw-resize";
        case top && left:
          return "nw-resize";
        case top:
          return "n-resize";
        case right:
          return "e-resize";
        case bottom:
          return "s-resize";
        case left:
          return "w-resize";
        default:
          return "";
      }
    }
    return "";
  }, [
    isHover,
    mousePosition.x,
    mousePosition.y,
    moveEnable,
    windowPosition.x,
    windowPosition.y,
    windowSize.h,
    windowSize.w
  ]);

  const setInitials = useCallback(
    (e?: DOMRect) => {
      setWindowSize({
        h: mainRef!.current!.clientHeight,
        w: mainRef!.current!.clientWidth
      });
      setInitialPosition({
        div: {
          x: e?.x || mainRef!.current!.getBoundingClientRect().x,
          y: e?.y || mainRef!.current!.getBoundingClientRect().y,
          r: e?.right || mainRef!.current!.getBoundingClientRect().right,
          b: e?.bottom || mainRef!.current!.getBoundingClientRect().bottom
        },
        cursor: {x: mousePosition.x, y: mousePosition.y},
        window: {h: windowSize.h, w: windowSize.w}
      });
    },
    [mousePosition.x, mousePosition.y, windowSize.h, windowSize.w]
  );

  useEffect(() => {
    setGIndexCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (moveEnable) {
      if (!mouseDown) {
        setInitials();
        setMoveEnable(false);
      }
      setWindowPosition({
        x: mousePosition.x + (initialPosition.div.x - initialPosition.cursor.x),
        y: mousePosition.y + (initialPosition.div.y - initialPosition.cursor.y)
      });
    }
  }, [
    initialPosition,
    initialPosition.cursor.x,
    initialPosition.cursor.y,
    initialPosition.div.x,
    initialPosition.div.y,
    mouseDown,
    mousePosition.x,
    mousePosition.y,
    moveEnable,
    setInitials
  ]);

  useEffect(() => {
    if (isEdge() !== "" && mouseDown) {
      setDrag(isEdge());
    } else if (drag !== "" && !mouseDown) {
      setDrag("");
      setInitials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseDown]);

  //resize the window
  useEffect(() => {
    if (drag !== "") {
      const widthChange =
        initialPosition.window.w + (mousePosition.x - initialPosition.cursor.x);
      const heightChange =
        initialPosition.window.h + (mousePosition.y - initialPosition.cursor.y);
      const negativeWidthChange =
        initialPosition.window.w - (mousePosition.x - initialPosition.cursor.x);
      const negativeHeightChange =
        initialPosition.window.h - (mousePosition.y - initialPosition.cursor.y);

      switch (drag) {
        case "ne-resize":
          setWindowSize({
            h:
              negativeHeightChange > min.size.h
                ? negativeHeightChange
                : min.size.h,
            w: widthChange
          });
          setWindowPosition({
            ...windowPosition,
            y:
              negativeHeightChange > min.size.h
                ? initialPosition.div.y +
                  (mousePosition.y - initialPosition.cursor.y)
                : initialPosition.div.b - min.size.h
          });
          break;
        case "se-resize":
          setWindowSize({
            w: widthChange,
            h: heightChange
          });
          break;
        case "sw-resize":
          setWindowSize({
            w:
              negativeWidthChange > min.size.w ? negativeWidthChange : min.size.w,
            h: heightChange
          });
          setWindowPosition({
            ...windowPosition,
            x:
              negativeWidthChange > min.size.w
                ? initialPosition.div.x +
                  (mousePosition.x - initialPosition.cursor.x)
                : initialPosition.div.r - min.size.w
          });
          break;
        case "nw-resize":
          setWindowSize({
            h:
              negativeHeightChange > min.size.h
                ? negativeHeightChange
                : min.size.h,
            w: negativeWidthChange > min.size.w ? negativeWidthChange : min.size.w
          });
          setWindowPosition({
            y:
              negativeHeightChange > min.size.h
                ? initialPosition.div.y +
                  (mousePosition.y - initialPosition.cursor.y)
                : initialPosition.div.b - min.size.h,
            x:
              negativeWidthChange > min.size.w
                ? initialPosition.div.x +
                  (mousePosition.x - initialPosition.cursor.x)
                : initialPosition.div.r - min.size.w
          });
          break;
        case "n-resize":
          setWindowSize({
            ...windowSize,
            h:
              negativeHeightChange > min.size.h
                ? negativeHeightChange
                : min.size.h
          });
          setWindowPosition({
            ...windowPosition,
            y:
              negativeHeightChange > min.size.h
                ? initialPosition.div.y +
                  (mousePosition.y - initialPosition.cursor.y)
                : initialPosition.div.b - min.size.h
          });
          break;
        case "e-resize":
          setWindowSize({
            ...windowSize,
            w: widthChange
          });
          break;
        case "s-resize":
          setWindowSize({
            ...windowSize,
            h: heightChange
          });
          break;
        case "w-resize":
          setWindowSize({
            ...windowSize,
            w: negativeWidthChange > min.size.w ? negativeWidthChange : min.size.w
          });
          setWindowPosition({
            ...windowPosition,
            x:
              negativeWidthChange > min.size.w
                ? initialPosition.div.x +
                  (mousePosition.x - initialPosition.cursor.x)
                : initialPosition.div.r - min.size.w
          });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag, mousePosition.y, mousePosition.x]);

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
