import React from "react";
import {Pole} from "@/app/features/home/helper/Pole";

export default function HeaderPoles() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        <Pole
          width={16}
          position={{top: -6, lr: "left-[1rem]"}}
          color="green"
        />
        <Pole
          width={12}
          position={{top: 2, lr: "-left-[2rem]"}}
          color="orange"
        />
        <Pole position={{top: 12, lr: "left-[6rem]"}} color="blue" />
        <Pole
          width={14}
          position={{top: 24, lr: "left-[12rem]"}}
          color="green"
        />
        <Pole
          width={12}
          position={{top: 36, lr: "-left-[2rem]"}}
          color="orange"
        />

        <Pole
          width={16}
          position={{top: -6, lr: "right-[2rem]"}}
          color="orange"
        />
        <Pole position={{top: 4, lr: "right-[12rem]"}} color="blue" />
        <Pole
          width={10}
          position={{top: 24, lr: "right-[20rem]"}}
          color="green"
        />
        <Pole
          width={16}
          position={{top: 14, lr: "-right-[6rem]"}}
          color="green"
        />
        <Pole
          width={12}
          position={{top: 32, lr: "right-[6rem]"}}
          color="orange"
        />
      </div>
    </div>
  );
}
