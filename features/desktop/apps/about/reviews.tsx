import {reviews} from "@/features/desktop/apps/about/helper";
import {motion} from "framer-motion";
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
          Next {">"}
        </button>
      </div>
      <div>
        <div className="flex flex-col justify-center border border-black p-4 h-28">
          <p>"{reviews[index].review}"</p>
          <p className="text-right text-ERed">- {reviews[index].name}</p>
        </div>
      </div>
    </div>
  );
}
