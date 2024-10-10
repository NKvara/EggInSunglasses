import {useCallback} from "react";
import {DRAG_PIXELS} from "@/features/desktop/helper/const";
import {
  isHover,
  moveEnable,
  mousePosition,
  windowPosition,
  windowSize
} from "@/features/desktop/components/types";

interface props {
  isHover: isHover;
  moveEnable: moveEnable;
  mousePosition: mousePosition;
  windowPosition: windowPosition;
  windowSize: windowSize;
}

export enum edgeSides {
  ne = "ne-resize",
  se = "se-resize",
  sw = "sw-resize",
  nw = "nw-resize",
  n = "n-resize",
  e = "e-resize",
  s = "s-resize",
  w = "w-resize",
  none = ""
}

export const useEdge = ({
  isHover,
  moveEnable,
  mousePosition,
  windowPosition,
  windowSize
}: props) => {
  return useCallback(() => {
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
          return edgeSides.ne;
        case bottom && right:
          return edgeSides.se;
        case bottom && left:
          return edgeSides.sw;
        case top && left:
          return edgeSides.nw;
        case top:
          return edgeSides.n;
        case right:
          return edgeSides.e;
        case bottom:
          return edgeSides.s;
        case left:
          return edgeSides.w;
        default:
          return edgeSides.none;
      }
    }
    return edgeSides.none;
  }, [isHover, mousePosition, moveEnable, windowPosition, windowSize]);
};
