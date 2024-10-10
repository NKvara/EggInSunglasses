"use client";

import useMousePosition from "@/features/hooks/useMousePosition";
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {useHover} from "usehooks-ts";
import {
  DRAG_PIXELS,
  MIN_HEIGHT,
  MIN_WIDTH
} from "@/features/desktop/helper/const";
import {motion} from "framer-motion";
import Toolbar from "@/features/desktop/components/toolbar";

export default function WindowManager({
  children,
  mouseDown,
  title,
  init,
  onClose
}: {
  children: ReactNode;
  mouseDown: boolean;
  title: string;
  init?: {position?: {x: number; y: number}; size?: {w: number; h: number}};
  onClose: () => void;
}) {
  const [windowSize, setWindowSize] = useState({
    h: init?.size?.h || 400,
    w: init?.size?.w || 400
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

  //move the window

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
              negativeHeightChange > MIN_HEIGHT
                ? negativeHeightChange
                : MIN_HEIGHT,
            w: widthChange
          });
          setWindowPosition({
            ...windowPosition,
            y:
              negativeHeightChange > MIN_HEIGHT
                ? initialPosition.div.y +
                  (mousePosition.y - initialPosition.cursor.y)
                : initialPosition.div.b - MIN_HEIGHT
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
              negativeWidthChange > MIN_WIDTH ? negativeWidthChange : MIN_WIDTH,
            h: heightChange
          });
          setWindowPosition({
            ...windowPosition,
            x:
              negativeWidthChange > MIN_WIDTH
                ? initialPosition.div.x +
                  (mousePosition.x - initialPosition.cursor.x)
                : initialPosition.div.r - MIN_WIDTH
          });
          break;
        case "nw-resize":
          setWindowSize({
            h:
              negativeHeightChange > MIN_HEIGHT
                ? negativeHeightChange
                : MIN_HEIGHT,
            w: negativeWidthChange > MIN_WIDTH ? negativeWidthChange : MIN_WIDTH
          });
          setWindowPosition({
            y:
              negativeHeightChange > MIN_HEIGHT
                ? initialPosition.div.y +
                  (mousePosition.y - initialPosition.cursor.y)
                : initialPosition.div.b - MIN_HEIGHT,
            x:
              negativeWidthChange > MIN_WIDTH
                ? initialPosition.div.x +
                  (mousePosition.x - initialPosition.cursor.x)
                : initialPosition.div.r - MIN_WIDTH
          });
          break;
        case "n-resize":
          setWindowSize({
            ...windowSize,
            h:
              negativeHeightChange > MIN_HEIGHT
                ? negativeHeightChange
                : MIN_HEIGHT
          });
          setWindowPosition({
            ...windowPosition,
            y:
              negativeHeightChange > MIN_HEIGHT
                ? initialPosition.div.y +
                  (mousePosition.y - initialPosition.cursor.y)
                : initialPosition.div.b - MIN_HEIGHT
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
            w: negativeWidthChange > MIN_WIDTH ? negativeWidthChange : MIN_WIDTH
          });
          setWindowPosition({
            ...windowPosition,
            x:
              negativeWidthChange > MIN_WIDTH
                ? initialPosition.div.x +
                  (mousePosition.x - initialPosition.cursor.x)
                : initialPosition.div.r - MIN_WIDTH
          });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag, mousePosition.y, mousePosition.x]);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: close ? 0 : 1}}
      onAnimationComplete={() => close && onClose()}
      id={title}
      ref={mainRef}
      tabIndex={0}
      className="absolute flex flex-col p-[2px] bg-black group z-20 focus:z-30"
      onMouseDown={(e) => {
        if (isEdge() !== "") {
          setInitials(e.currentTarget.getBoundingClientRect());
        }
      }}
      style={{
        width: windowSize.w,
        height: windowSize.h,
        top: windowPosition.y,
        left: windowPosition.x,
        minHeight: MIN_WIDTH,
        minWidth: MIN_HEIGHT,
        cursor: drag || isEdge()
      }}
    >
      {mouseDown && drag && (
        <div
          className="fixed top-0 left-0 z-[9999] w-svw h-svh"
          style={{cursor: drag}}
        />
      )}
      <div />
      <Toolbar
        isEdge={isEdge() === ""}
        setClose={setClose}
        setInitials={setInitials}
        setMoveEnable={setMoveEnable}
        title={title}
      />
      {children}
    </motion.div>
  );
}
