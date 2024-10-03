import {Pole} from "@/app/features/helper/Pole";

export default function HomeHeader() {
  return (
    <div className="relative flex justify-center h-svh w-svw overflow-hidden">
      <Pole position={{top: 10, lr: "left-[4rem]"}} />
      <Pole position={{top: 32, lr: "left-[10rem]"}} />
      <Pole position={{top: 8, lr: "right-[4rem]"}} />
      <Pole position={{top: 34, lr: "right-[14rem]"}} />
      <div className="max-w-pc w-full"></div>
    </div>
  );
}
