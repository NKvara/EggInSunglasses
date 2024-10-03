"use client";

import {motion} from "framer-motion";
import {useState} from "react";

export const Pole = ({
  width,
  height,
  position,
  gradintCircle,
  gradientPillar
}: {
  width?: number;
  height?: number;
  position: {top: number; lr: string};
  gradintCircle?: string;
  gradientPillar?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`absolute h-full ${position.lr}`}
      style={{top: `${position.top}rem`}}
    >
      <div 
        className={`relative h-full`}
        style={{width: width ? `${width}rem` : "16rem"}}
      >
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate={{
            top: isHovered ? `3rem` : `0`
          }}
          className="absolute w-full rounded-full z-10"
          style={{
            height: height ? `${height}rem` : "5rem",
            background:
              gradintCircle ||
              "linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)"
          }}
        />
        <div
          className="relative top-0 h-full"
          style={{top: height ? `${height / 2}rem` : "2.5rem"}}
        >
          <motion.div
            animate={{
              top: isHovered ? `3rem` : `0`
            }}
            className="absolute top-0 h-full w-full"
            style={{
              background:
                gradientPillar ||
                "linear-gradient(90deg, rgba(22,78,99,1) 10%, rgba(0,1,18,1) 40%, rgba(0,1,18,1) 80%, rgba(30,58,138,1) 100%)"
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
