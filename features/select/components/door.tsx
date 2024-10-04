import {motion} from "framer-motion";
import React, {useState} from "react";

export default function Door({
  text,
  image,
  gradient
}: {
  text: string;
  image: string;
  gradient: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      transition={{ease: "easeInOut", duration: 1}}
      className="relative w-80 h-full rounded-t-full flex justify-center items-center overflow-hidden opacity-80 cursor-pointer"
      style={{
        backgroundColor: "white",
        background: hover
          ? gradient
          : "white"
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-cover rounded-t-full bg-center"
        animate={{
          opacity: hover ? 1 : 0.5,
          filter: hover ? "blur(0px)" : "blur(6px)"
        }}
        style={{
          backgroundImage: `url(${image})`,
          mixBlendMode: "difference"
        }}
      />
      <h1 className="text-white text-5xl font-bold uppercase mix-blend-overlay">
        {text}
      </h1>
    </motion.div>
  );
}
