import {Pole} from "@/features/home/helper/Pole";
import React from "react";

const poles = [
  {
    top: -6,
    lr: "left-[1rem]",
    width: 16,
    color: "green"
  },
  {
    top: 2,
    lr: "-left-[2rem]",
    width: 12,
    color: "orange"
  },
  {
    top: 12,
    lr: "left-[6rem]",
    color: "blue"
  },
  {
    top: 24,
    lr: "left-[12rem]",
    width: 14,
    color: "green"
  },
  {
    top: 36,
    lr: "-left-[2rem]",
    width: 12,
    color: "orange"
  },
  {
    top: -6,
    lr: "right-[2rem]",
    width: 16,
    color: "orange"
  },
  {
    top: 4,
    lr: "right-[12rem]",
    color: "blue"
  },
  {
    top: 24,
    lr: "right-[20rem]",
    width: 10,
    color: "green"
  },
  {
    top: 14,
    lr: "-right-[6rem]",
    width: 16,
    color: "green"
  },
  {
    top: 32,
    lr: "right-[6rem]",
    width: 12,
    color: "orange"
  }
];

export default function HeaderPoles({click}: {click: boolean}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        {poles.map((o, i) => (
          <Pole
            key={"pole-" + i}
            width={o.width}
            position={{top: o.top, lr: o.lr}}
            color={o.color}
            outerClick={click}
          />
        ))}
      </div>
    </div>
  );
}
