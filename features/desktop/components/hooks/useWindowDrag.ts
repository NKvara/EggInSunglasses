import {
  initialPosition,
  mousePosition,
  moveEnable,
  setMoveEnable,
  setWindowPosition
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
}

export const useWindowDrag = ({
  moveEnable,
  mouseDown,
  setInitials,
  setMoveEnable,
  setWindowPosition,
  mousePosition,
  initialPosition
}: props) => {
  return useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosition, mouseDown, mousePosition, moveEnable, setInitials]);
};
