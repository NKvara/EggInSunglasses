import {reviews} from "@/features/desktop/apps/about/helper";
import {useEffect, useState} from "react";

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * reviews.length));
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <span className="font-bold">What others say about me:</span>
        <button
          onClick={() => setIndex(index + 1 === reviews.length ? 0 : index + 1)}
        >
          <span className="underline underline-offset-2">Next</span> {">"}
        </button>
      </div>
      <div className="bg-indigo-50/70">
        <div className="flex flex-col justify-center border border-black p-4 h-28">
          <p>&quot;{reviews[index].review}&quot;</p>
          <p className="text-right text-ERed">- {reviews[index].name}</p>
        </div>
      </div>
    </div>
  );
}
