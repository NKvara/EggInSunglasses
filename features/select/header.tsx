import Door from "@/features/select/components/door";
import {motion} from "framer-motion";
import {SparklesCore} from "@/features/ui/sparkles";
import {doors} from "@/features/select/helper/doors";
export default function SelectHeader() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{ease: "easeInOut", duration: 1}}
      className="h-svh w-svw flex flex-col justify-between items-center p-2 overflow-hidden"
    >
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        speed={0.1}
        particleDensity={200}
        className="absolute w-full h-full"
        particleColor="#9294ad"
      />
      <div className="flex justify-center items-center flex-1">
        <p className="text-6xl font-bold uppercase bg-gradient-to-r from-blue-950 via-cyan-900 to-indigo-900 inline-block text-transparent bg-clip-text">
          things i've worked on
        </p>
      </div>
      <div className="h-3/5 flex justify-around w-full">
        {doors.map((o) => (
          <Door
            image={o.image}
            text={o.text}
            gradient={o.gradient}
            key={o.text}
          />
        ))}
      </div>
    </motion.div>
  );
}
