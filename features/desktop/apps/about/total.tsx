import React from "react";
import {useEffect, useState} from "react";

export default function TotalExperience() {
  const startDate = Date.parse("02 sep 2021 00:12:00 GMT");

  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
    <span>
      {Object.entries(time).map(([key, value]) => (
        <span
          key={key}
          className={key === "years" ? "" : "text-[8px] text-neutral-600"}
        >
          {value} {value === 1 ? key.slice(0, -1) : key}
          {key === "minutes"
            ? " and "
            : key !== "seconds" && (
                <span className="text-[8px] text-neutral-600">, </span>
              )}
        </span>
      ))}
    </span>
  );
}
