import {
  initialPosition,
  mousePosition,
  moveEnable,
  setMoveEnable,
  setWindowPosition,
  parentSize
} from "@/features/desktop/components/types";
import {useEffect} from "react";

interface props {
  moveEnable: moveEnable;
  mouseDown: boolean;
  setInitials: () => void;
  setMoveEnable: setMoveEnable;
  setWindowPosition: setWindowPosition;
  mousePosition: mousePosition;
  initialPosition: initialPosition;
  parentSize: parentSize;
}

export const useWindowDrag = ({
  moveEnable,
  mouseDown,
  setInitials,
  setMoveEnable,
  setWindowPosition,
  mousePosition,
  initialPosition,
  parentSize
}: props) => {
  return useEffect(() => {
    if (moveEnable) {
      if (!mouseDown) {
        setInitials();
        setMoveEnable(false);
      } else {
        const defaultMoveX =
          mousePosition.x + (initialPosition.div.x - initialPosition.cursor.x);
        const defaultMoveY =
          mousePosition.y + (initialPosition.div.y - initialPosition.cursor.y);

        setWindowPosition({
          x:
            defaultMoveX <= 0
              ? 0
              : defaultMoveX + initialPosition.window.w >= parentSize.width
              ? parentSize.width - initialPosition.window.w
              : defaultMoveX,
          y:
            defaultMoveY <= 32
              ? 32
              : defaultMoveY + initialPosition.window.h >= parentSize.height
              ? parentSize.height - initialPosition.window.h
              : defaultMoveY
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseDown, mousePosition, moveEnable]);
};
