"use client";

import HeaderPoles from "@/app/features/home/components/header/poles";
import HeaderText from "@/app/features/home/components/header/text";
import {Pole} from "@/app/features/home/helper/Pole";
import {motion} from "framer-motion";
import {useState} from "react";

export default function HomeHeader() {
  const [animationEnd, SetAnimationEnd] = useState(false);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: animationEnd ? 0 : 1}}
      transition={{ease: "easeInOut", duration: 3}}
      className="flex justify-center h-svh w-svw overflow-hidden"
    >
      <HeaderPoles />
      <div className="flex flex-col justify-center max-w-pc w-full">
        <HeaderText />
        <Pole
          width={10}
          position={{top: 38, lr: "right-[calc(50svw-5rem)]"}}
          color="white"
          SetAnimationEnd={SetAnimationEnd}
          clickable
        />
      </div>
    </motion.div>
  );
}
