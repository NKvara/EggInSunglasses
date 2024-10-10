import {Dispatch, ReactNode, SetStateAction} from "react";

const TButton = ({
  children,
  onClick
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className="border-2 border-slate-50 cursor-pointer" onClick={onClick}>
      <div className="w-[22px] aspect-square bg-violet-200 border-t-2 border-l-2 border-violet-900 p-0.5">
        {children}
      </div>
    </div>
  );
};

export default function Toolbar({
  title,
  isEdge,
  setMoveEnable,
  setInitials,
  setClose
}: {
  title: string;
  isEdge: boolean;
  setMoveEnable: Dispatch<SetStateAction<boolean>>;
  setInitials: (e?: DOMRect) => void;
  setClose: Dispatch<SetStateAction<boolean>>;
}) {
  const lines = Array.from({length: 6}, (_, i) => i + 1);
  return (
    <div
      className="relative group border-b-2 border-black"
      onMouseDown={(e) => {
        if (isEdge) {
          setInitials(e.currentTarget.parentElement?.getBoundingClientRect());
          setMoveEnable(true);
        }
      }}
    >
      <div className="group-focus:hidden flex justify-center items-center w-full h-8 min-h-8 bg-white">
        <p className="font-bold text-gray-500 capitalize pointer-events-none select-none py-0.5 px-2">
          {title}
        </p>
      </div>

      <div className="relative hidden group-focus:flex items-center justify-between w-full h-8 min-h-8 goup border-2 border-violet-200 bg-white group-focus:bg-slate-50">
        <div className="flex flex-col justify-center gap-0.5 absolute top-0 left-0 w-full h-full pointer-events-none">
          {lines.map((n) => (
            <div key={`line-${n}`} className="h-0.5 bg-neutral-500 w-full" />
          ))}
        </div>
        <div className="z-10 flex items-center justify-between w-full mx-4">
          <TButton onClick={() => setClose(true)}>
            <div className="bg-neutral-400 w-full h-full border-b-2 border-r-2 border-violet-900" />
          </TButton>
          <p className="bg-slate-50 font-bold capitalize pointer-events-none select-none py-0.5 px-2">
            {title}
          </p>
          <TButton
            onClick={() => {
              console.log("TODO");
            }}
          >
            <div />
          </TButton>
        </div>
      </div>
    </div>
  );
}
