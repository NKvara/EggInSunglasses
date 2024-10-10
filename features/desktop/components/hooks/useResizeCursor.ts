import {Dispatch, SetStateAction, useEffect} from "react";
import {edgeSides} from "@/features/desktop/components/hooks/isEdge";

interface props {
  isEdge: () => edgeSides;
  drag: edgeSides;
  mouseDown: boolean;
  setInitials: () => void;
  setDrag: Dispatch<SetStateAction<edgeSides>>;
}

export const useResizeCursor = ({
  isEdge,
  drag,
  mouseDown,
  setInitials,
  setDrag
}: props) => {
  return useEffect(() => {
    if (isEdge() !== "" && mouseDown) {
      setDrag(isEdge());
    } else if (drag !== "" && !mouseDown) {
      setDrag(edgeSides.none);
      setInitials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseDown]);
};
