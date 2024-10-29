"use client";

import {cn} from "@/features/lib/utils";
import {motion} from "framer-motion";
import {Dispatch, SetStateAction, useState} from "react";

export const Pole = ({
  width,
  height,
  position,
  color,
  outerClick,
  clickable,
  setAnimationStart,
  setAnimationEnd,
}: {
  width?: number;
  height?: number;
  position: {top: number; lr: string};
  color: string;
  outerClick?: boolean;
  clickable?: boolean;
  setAnimationStart?: Dispatch<SetStateAction<boolean>>;
  setAnimationEnd?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [click, setClick] = useState(false);

  const gradient = () => {
    switch (color) {
      case "green":
        return {
          cl: "#6d765e",
          cr: "#95a765",
          sl: "#414738",
          sr: "#575e4b"
        };
      case "orange":
        return {
          cl: "#b6472e",
          cr: "#db7242",
          sl: "#733c42",
          sr: "#904648"
        };
      case "blue":
        return {
          cl: "#43618a",
          cr: "#6285a7",
          sl: "#13253f",
          sr: "#1d3860"
        };
      case "white":
        return {
          cl: "#d3c9a3",
          cr: "#e8e3cf",
          sl: "#9d9b6f",
          sr: "#c0bb7c"
        };
    }
  };

  return (
    <motion.div
      className={cn(`absolute h-full ${position.lr}`)}
      initial={{top: `${position.top + Math.random() * (80 - 64) + 64}rem`}}
      style={{top: `${position.top}rem`}}
      animate={{
        top:
          click || outerClick
            ? `${position.top + Math.random() * (120 - 64) + 64}rem`
            : `${position.top}rem`
      }}
      transition={{ease: "easeInOut", duration: 2}}
      onAnimationStart={() =>
        click && setAnimationStart && setAnimationStart(true)
      }
      onAnimationComplete={() =>
        click && setAnimationEnd && setAnimationEnd(true)
      }
    >
      <div
        className="relative h-full"
        style={{width: width ? `${width}rem` : "16rem"}}
      >
        <motion.div
          onHoverStart={() => !click && setIsHovered(true)}
          onHoverEnd={() => !click && setIsHovered(false)}
          onClick={() => clickable && setClick(true)}
          animate={{
            top: isHovered ? `3rem` : `0`
          }}
          className="absolute w-full rounded-full z-10"
          style={{
            height: height ? `${height}rem` : "6rem",
            background: `linear-gradient(90deg, ${gradient()?.cl} 0%, ${
              gradient()?.cr
            } 100%)`
          }}
        />
        <div
          className="relative top-0 h-full"
          style={{top: height ? `${height / 2}rem` : "3rem"}}
        >
          <motion.div
            animate={{
              top: isHovered ? `3rem` : `0`
            }}
            className="absolute top-0 h-full w-full"
            style={{
              background: `linear-gradient(90deg, ${
                gradient()?.sl
              } 10%, rgba(0,1,18,1) 40%, rgba(0,1,18,1) 80%, ${
                gradient()?.sr
              } 100%)`
            }}
          />
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,1,18,1) 50%)"
            }}
            className="absolute bottom-0 h-[30rem] w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
