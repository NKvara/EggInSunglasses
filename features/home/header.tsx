"use client";

import HeaderPoles from "@/features/home/components/header/poles";
import HeaderText from "@/features/home/components/header/text";
import {Pole} from "@/features/home/helper/Pole";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function HomeHeader() {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: animationEnd ? 0 : 1}}
      transition={{ease: "easeInOut", duration: 1}}
      onAnimationComplete={() => animationEnd && router.push("/desktop")}
      className="flex justify-center h-svh w-svw overflow-hidden"
    >
      <HeaderPoles click={click} />
      <div className="flex flex-col justify-center max-w-pc w-full">
        <HeaderText />
        <Pole
          width={10}
          position={{top: 38, lr: "right-[calc(50svw-5rem)]"}}
          color="white"
          setAnimationStart={setClick}
          setAnimationEnd={setAnimationEnd}
          clickable
        />
      </div>
    </motion.div>
  );
}
