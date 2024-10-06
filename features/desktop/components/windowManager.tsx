"use client";

import useMousePosition from "@/features/hooks/useMousePosition";
import {useCallback, useEffect, useRef, useState} from "react";
import {useHover} from "usehooks-ts";
import {DRAG_PIXELS} from "@/features/desktop/helper/const";

export default function WindowManager() {
  const [windowSize, setWindowSize] = useState({h: 400, w: 400});
  const [windowPosition, setWindowPosition] = useState({x: 0, y: 0});
  const [initialPosition, setInitialPosition] = useState({
    div: {x: 0, y: 0},
    cursor: {x: 0, y: 0},
    window: {h: windowSize.h, w: windowSize.w}
  });
  const [moveEnable, setMoveEnable] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const mousePosition = useMousePosition();
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  console.log(mousePosition.y - initialPosition.div.y - windowSize.h);

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

  //move the window
  useEffect(() => {
    if (moveEnable) {
      setWindowPosition({
        x: mousePosition.x + (initialPosition.div.x - initialPosition.cursor.x),
        y: mousePosition.y + (initialPosition.div.y - initialPosition.cursor.y)
      });
    }
  }, [initialPosition, isEdge, mousePosition.x, mousePosition.y, moveEnable]);

  //resize the window
  useEffect(() => {
    if (mouseDown) {
      // bottom
      if (isEdge().b) {
        setWindowSize({
          ...windowSize,
          h:
            windowSize.h +
            (mousePosition.y -
              initialPosition.div.y -
              windowSize.h +
              (initialPosition.cursor.y - initialPosition.div.y - windowSize.h))
        });
      }
    }
  }, [
    initialPosition.cursor.y,
    initialPosition.div.y,
    isEdge,
    isSizing,
    mouseDown,
    mousePosition.y,
    windowSize
  ]);

  const setInitials = (e: MouseEvent) => {
    setInitialPosition({
      div: {
        x: e!.currentTarget!.getBoundingClientRect().x,
        y: e!.currentTarget!.getBoundingClientRect().y
      },
      cursor: {x: mousePosition.x, y: mousePosition.y},
      window: {h: windowSize.h, w: windowSize.w}
    });
  };

  return (
    <div
      className="absolute flex flex-col"
      onMouseDown={(e) => {
        if (isSizing() !== "default") {
          setInitialPosition({
            div: {
              x: e.currentTarget.getBoundingClientRect().x,
              y: e.currentTarget.getBoundingClientRect().y
            },
            cursor: {x: mousePosition.x, y: mousePosition.y}
          });
          setMouseDown(true);
        }
      }}
      onMouseUp={() => isSizing() !== "default" && setMouseDown(false)}
      style={{
        width: windowSize.w,
        height: windowSize.h,
        top: windowPosition.y,
        left: windowPosition.x,
        cursor: isSizing()
      }}
      ref={hoverRef}
    >
      <div
        id="topbar"
        className="w-full h-8 bg-slate-500"
        onMouseDown={(e) => {
          if (isSizing() === "default") {
            setInitialPosition({
              div: {
                x: e.currentTarget.getBoundingClientRect().x,
                y: e.currentTarget.getBoundingClientRect().y
              },
              cursor: {x: mousePosition.x, y: mousePosition.y}
            });
            setMoveEnable(true);
          }
        }}
        onMouseUp={(e) => {
          setMoveEnable(false);
          setInitialPosition({
            div: {
              x: e.currentTarget.getBoundingClientRect().x,
              y: e.currentTarget.getBoundingClientRect().y
            },
            cursor: {x: mousePosition.x, y: mousePosition.y}
          });
        }}
      />

      <div className="flex justify-center items-center w-full h-full bg-white">
        dynamic stuff here
      </div>
    </div>
  );
}
