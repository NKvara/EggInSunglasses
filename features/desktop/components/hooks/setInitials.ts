import {
  setWindowSize,
  mainRef,
  setInitialPosition,
  mousePosition,
  windowSize
} from "@/features/desktop/components/types";
import {useCallback} from "react";

interface props {
  mainRef: mainRef;
  setWindowSize: setWindowSize;
  setInitialPosition: setInitialPosition;
  mousePosition: mousePosition;
  windowSize: windowSize;
}

export const useInitials = ({
  mainRef,
  mousePosition,
  windowSize,
  setWindowSize,
  setInitialPosition
}: props) => {
  return useCallback(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mousePosition.x, mousePosition.y, windowSize.h, windowSize.w]
  );
};
