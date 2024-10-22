const Cell = ({type, number}: {type: string; number: number}) => {
  switch (type) {
    case "":
      return (
        <div
          className={`w-full h-full ${number ? "bg-blue-400" : "bg-blue-500"}`}
        />
      );
    case "b":
      return <div className="w-full h-full bg-red-400" />;
    case "e":
      return (
        <div
          className={`w-full h-full ${
            number ? "bg-slate-400" : "bg-slate-500"
          }`}
        />
      );
    case "f":
      return <div className="w-full h-full bg-teal-400" />;
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
