"use client";

import useMousePosition from "@/features/hooks/useMousePosition";
import {useCallback, useEffect, useRef, useState} from "react";
import {useHover} from "usehooks-ts";
import {
  DRAG_PIXELS,
  MIN_HEIGHT,
  MIN_WIDTH
} from "@/features/desktop/helper/const";

export default function WindowManager({mouseDown}: {mouseDown: boolean}) {
  const [windowSize, setWindowSize] = useState({h: 400, w: 400});
  const [windowPosition, setWindowPosition] = useState({x: 0, y: 0});
  const [initialPosition, setInitialPosition] = useState({
    div: {x: 0, y: 0, r: windowSize.w, b: windowSize.h},
    cursor: {x: 0, y: 0},
    window: {h: windowSize.h, w: windowSize.w}
  });
  const [moveEnable, setMoveEnable] = useState(false);
  const [drag, setDrag] = useState("default");
  const mousePosition = useMousePosition();
  const mainRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(mainRef);

  const isEdge = useCallback(() => {
    if (isHover && !moveEnable) {
      const left =
        mousePosition.x >= initialPosition.div.x &&
        mousePosition.x <= initialPosition.div.x + DRAG_PIXELS;
      const right =
        mousePosition.x >= initialPosition.div.x + windowSize.w - DRAG_PIXELS &&
        mousePosition.x <= initialPosition.div.x + windowSize.w;
      const top =
        mousePosition.y >= initialPosition.div.y &&
        mousePosition.y <= initialPosition.div.y + DRAG_PIXELS;
      const bottom =
        mousePosition.y >= initialPosition.div.y + windowSize.h - DRAG_PIXELS &&
        mousePosition.y <= initialPosition.div.y + windowSize.h;

      return {
        l: left,
        r: right,
        t: top,
        b: bottom,
        tl: top && left,
        tr: top && right,
        bl: bottom && left,
        br: bottom && right
      };
    }
    return {
      l: false,
      r: false,
      t: false,
      b: false,
      tl: false,
      tr: false,
      bl: false,
      br: false
    };
  }, [
    initialPosition.div.x,
    initialPosition.div.y,
    isHover,
    mousePosition.x,
    mousePosition.y,
    moveEnable,
    windowSize.h,
    windowSize.w
  ]);

  const isSizing = useCallback(() => {
    switch (true) {
      case isEdge().tr:
        return "ne-resize";
      case isEdge().br:
        return "se-resize";
      case isEdge().bl:
        return "sw-resize";
      case isEdge().tl:
        return "nw-resize";
      case isEdge().t:
        return "n-resize";
      case isEdge().r:
        return "e-resize";
      case isEdge().b:
        return "s-resize";
      case isEdge().l:
        return "w-resize";
      default:
        return "default";
    }
  }, [isEdge]);

  const setInitials = (e?: DOMRect) => {
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
  };

  useEffect(() => {
    if (isSizing() !== "default" && mouseDown) {
      setDrag(isSizing());
    } else if (drag !== "default" && !mouseDown) {
      setDrag("default");
      setInitials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseDown]);

  //move the window
  useEffect(() => {
    if (moveEnable) {
      setWindowPosition({
        x: mousePosition.x + (initialPosition.div.x - initialPosition.cursor.x),
        y: mousePosition.y + (initialPosition.div.y - initialPosition.cursor.y)
      });
    }
  }, [
    initialPosition.cursor.x,
    initialPosition.cursor.y,
    initialPosition.div.x,
    initialPosition.div.y,
    mousePosition.x,
    mousePosition.y,
    moveEnable
  ]);

  //resize the window
  useEffect(() => {
    if (drag !== "default") {
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
    <div
      ref={mainRef}
      className="absolute flex flex-col p-[1px] bg-black"
      onMouseDown={(e) => {
        if (isSizing() !== "default") {
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
        cursor: isSizing()
      }}
    >
      <div
        id="topbar"
        className="w-full h-8 min-h-8 bg-slate-500"
        onMouseDown={() => {
          if (isSizing() === "default") {
            setInitials();
            setMoveEnable(true);
          }
        }}
        onMouseUp={(e) => {
          setInitials(e.currentTarget.parentElement?.getBoundingClientRect());
          setMoveEnable(false);
        }}
      />

      <div className="flex justify-center items-center w-full h-full bg-white overflow-y-scroll">
        dynamic stuff here
      </div>
    </div>
  );
}
