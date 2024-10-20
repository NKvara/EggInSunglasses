const Cell = ({type}: {type: string}) => {
  switch (type) {
    case "":
      return <div className="w-full h-full bg-neutral-400" />;
    case "b":
      return <div className="w-full h-full bg-red-400" />;
    case "e":
      return <div className="w-full h-full bg-neutral-600" />;
    case "f":
      return <div className="w-full h-full bg-teal-400" />;
    default:
      return (
        <div className="flex justify-center items-center select-none w-full h-full bg-neutral-600 text-white">{type}</div>
      );
  }
};

export default Cell;
