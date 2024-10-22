import Image from "next/image";
import React, {useEffect, useState} from "react";

export default function About() {
  const startDate = Date.parse("02 sep 2021 00:12:00 GMT");

  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const dS = (n: number) => {
    if (n === 1) return "";
    return "s";
  };

  const timePassed = () => {
    const now = Date.parse(Date());
    const diff = new Date(now - startDate);
    setTime({
      ...time,
      years: diff.getFullYear() - 1970,
      months: diff.getMonth(),
      days: diff.getDate(),
      hours: diff.getHours(),
      minutes: diff.getMinutes(),
      seconds: diff.getSeconds()
    });
  };

  useEffect(() => {
    timePassed();
  }, []);

  useEffect(() => {
    const interval = setInterval(timePassed, 1000);
    return () => clearInterval(interval);
  }, [startDate, time]);

  return (
    <div className="bg-white w-full h-full">
      <div className="flex flex-col gap-1 p-4">
        <p className="font-bold ">Nika Kvaratskhelia</p>
        <p>
          <div className="group/hover-text relative cursor-default inline">
            <span className="text-ERed">Front-End </span>
            <div className="opacity-0 group-hover/hover-text:opacity-100 absolute bg-white border border-black w-max duration-200">
              I make websites
            </div>
          </div>
          Developer
        </p>
        <p>
          Total Experience:{" "}
          <span>
            {time.years} years
            <span className="text-[8px] text-neutral-600">
              , {time.months} month{dS(time.months)}, {time.days} day
              {dS(time.days)}, {time.hours} hour{dS(time.hours)}, {time.minutes}{" "}
              minute{dS(time.minutes)} and {time.seconds} second
              {dS(time.seconds)}
            </span>
          </span>
        </p>
      </div>
      <div className="h-px w-full bg-black" />
      <div className="p-4">
        <p className="pb-2">Get in touch with me:</p>
        <a className="flex items-center gap-2 w-min" href="mailto:nika.kvaratskhelia.01@gmail.com">
          <div className="w-[18px]">
            <Image
              src="/images/desktop/email.png"
              width={18}
              height={14}
              alt={""}
              unoptimized={true}
            />
          </div>
          <p>nika.kvaratskhelia.01@gmail.com</p>
        </a>
      </div>
    </div>
  );
}
