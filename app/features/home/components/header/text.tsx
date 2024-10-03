import React from "react";
import {SparklesCore} from "@/app/features/ui/sparkles";

export default function HeaderText() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden pointer-events-none">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative -z-10">
        Welcome
      </h1>
      <div className="w-[40rem] h-40 relative -z-20">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#43618a] to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#43618a] to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#733c42] to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#b6472e] to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#6d765e"
        />

        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
