import {Dispatch, SetStateAction, RefObject} from "react";

export type mainRef = RefObject<HTMLDivElement>;

export type mousePosition = {
  x: number;
  y: number;
};

export type isHover = boolean;

export type moveEnable = boolean;

export type min = {size: {w: number; h: number}};

export type windowSize = {
  h: number;
  w: number;
};
export type setWindowSize = Dispatch<SetStateAction<windowSize>>;

export type setMoveEnable = Dispatch<SetStateAction<boolean>>;

export type windowPosition = {
  x: number;
  y: number;
};
export type setWindowPosition = Dispatch<SetStateAction<windowPosition>>;

export type initialPosition = {
  div: {
    x: number;
    y: number;
    r: number;
    b: number;
  };
  cursor: {
    x: number;
    y: number;
  };
  window: {
    h: number;
    w: number;
  };
};

export type parentSize = {width: number; height: number};

export type setInitialPosition = Dispatch<SetStateAction<initialPosition>>;
