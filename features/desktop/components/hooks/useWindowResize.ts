import {useEffect} from "react";
import {edgeSides} from "@/features/desktop/components/hooks/isEdge";
import {
  initialPosition,
  min,
  mousePosition,
  setWindowPosition,
  setWindowSize,
  windowPosition,
  windowSize
} from "@/features/desktop/components/types";

interface props {
  drag: edgeSides;
  windowSize: windowSize;
  initialPosition: initialPosition;
  mousePosition: mousePosition;
  setWindowSize: setWindowSize;
  setWindowPosition: setWindowPosition;
  windowPosition: windowPosition;
  min: min;
}

export const useWindowResize = ({
  drag,
  windowSize,
  initialPosition,
  mousePosition,
  setWindowSize,
  setWindowPosition,
  windowPosition,
  min
}: props) => {
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
        case edgeSides.ne:
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
        case edgeSides.se:
          setWindowSize({
            w: widthChange,
            h: heightChange
          });
          break;
        case edgeSides.sw:
          setWindowSize({
            w:
              negativeWidthChange > min.size.w
                ? negativeWidthChange
                : min.size.w,
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
        case edgeSides.nw:
          setWindowSize({
            h:
              negativeHeightChange > min.size.h
                ? negativeHeightChange
                : min.size.h,
            w:
              negativeWidthChange > min.size.w
                ? negativeWidthChange
                : min.size.w
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
        case edgeSides.n:
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
        case edgeSides.e:
          setWindowSize({
            ...windowSize,
            w: widthChange
          });
          break;
        case edgeSides.s:
          setWindowSize({
            ...windowSize,
            h: heightChange
          });
          break;
        case edgeSides.w:
          setWindowSize({
            ...windowSize,
            w:
              negativeWidthChange > min.size.w
                ? negativeWidthChange
                : min.size.w
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
  }, [drag, mousePosition]);
};
