import React, {useState} from "react";
import YouTube from "react-youtube";

export default function Browser() {
  const [again, setAgain] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!again ? (
        <YouTube
          videoId="cyLgAjP75YQ"
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
              playsinline: 1
            }
          }}
          style={{width: "100%", height: "100%"}}
          onEnd={() => setAgain(true)}
        />
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-full bg-white">
          <p>Again?</p>
          <button className="text-xl text-lime-600" onClick={() => setAgain(false)}>YES</button>
        </div>
      )}
    </div>
  );
}
