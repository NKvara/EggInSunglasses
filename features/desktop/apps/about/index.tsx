import Reviews from "@/features/desktop/apps/about/reviews";
import TotalExperience from "@/features/desktop/apps/about/total";
import CopyText from "@/features/shared/copyText";
import {motion} from "framer-motion";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="bg-white w-full h-full">
      <div className="max-w-[600px]">
        <div className="relative flex items-center p-4 overflow-hidden z-10">
          <motion.div
            className="absolute left-0 top-0 w-[400px] h-[400px] -z-10 opacity-30"
            style={{backgroundImage: "url('/images/desktop/checker.png')"}}
            initial={{scale: 2}}
            animate={{x: ["8%", "50%"], y: ["8%", "50%"]}}
            transition={{ 
              duration: 60,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <div className="w-[64px] mt-1">
            <Image
              src="/images/desktop/mac-glasses.png"
              width={50}
              height={64}
              alt={""}
              unoptimized={true}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Nika Kvaratskhelia</p>
            <div>
              <div className="group/hover-text relative cursor-default inline">
                <span className="text-ERed">Front-End </span>
                <div className="opacity-0 group-hover/hover-text:opacity-100 absolute bg-white border border-black w-max duration-200 pointer-events-none">
                  I make websites
                </div>
              </div>
              <span>Developer</span>
            </div>
            <div className="inline">
              <span>Total Experience: </span>
              <TotalExperience />
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-black" />
        <div className="p-4">
          <p className="pb-2 font-bold">Get in touch with me:</p>
          <div className="flex items-center gap-2">
            <a href="mailto:nika.kvaratskhelia.01@gmail.com">
              <div className="w-[18px]">
                <Image
                  src="/images/desktop/email.png"
                  width={18}
                  height={14}
                  alt={""}
                  unoptimized={true}
                />
              </div>
            </a>
            <div className="cursor-pointer">
              <CopyText text="nika.kvaratskhelia.01@gmail.com" />
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <Reviews />
      </div>
    </div>
  );
}
