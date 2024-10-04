"use client";

import HeaderPoles from "@/features/home/components/header/poles";
import HeaderText from "@/features/home/components/header/text";
import { Pole } from "@/features/home/helper/Pole";
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";
import {useState} from "react";

export default function HomeHeader() {
  const router = useRouter()
  const [animationEnd, SetAnimationEnd] = useState(false);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: animationEnd ? 0 : 1}}
      transition={{ease: "easeInOut", duration: 3}}
      onAnimationComplete={() => animationEnd && router.push('/select')}
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
