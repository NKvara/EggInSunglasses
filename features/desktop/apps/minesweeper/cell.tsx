const Cell = ({type, number}: {type: string; number: number}) => {
  switch (type) {
    case "":
      return (
        <div className="w-full h-full bg-slate-300 active:bg-slate-500 border-slate-100 active:border-slate-600 border-b-slate-500 active:border-b-slate-400 border-r-slate-500 active:border-r-slate-400 border-[3px]" />
      );
    case "b":
      return (
        <div className="w-full h-full bg-red-300 border-l-red-100 border-t-red-100 border-b-red-400 border-r-red-400 border-[3px]" />
      );
    case "e":
      return (
        <div
          className={`w-full h-full ${
            number ? "bg-slate-400" : "bg-slate-500"
          }`}
        />
      );
    case "f":
      return (
        <div className="w-full h-full bg-teal-300 border-l-teal-100 border-t-teal-100 border-b-teal-500 border-r-teal-500 border-[3px]" />
      );
    default:
      return (
        <div
          className={`flex justify-center items-center select-none w-full h-full ${
            number ? "bg-slate-400" : "bg-slate-500"
          } text-EWhite font-bold text-sm`}
        >
          {type}
        </div>
      );
  }
};

export default Cell;
