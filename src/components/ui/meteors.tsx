"use client";;
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface MeteorStyle {
  left: string;
  animationDelay: string;
  animationDuration: string;
}

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({
  number = 20
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);

  useEffect(() => {
    const styles: MeteorStyle[] = [...new Array(number)].map(() => ({
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 0.5 + "s",
      animationDuration: Math.floor(Math.random() * 3 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (<>
    {[...meteorStyles].map((style, idx) => (
      // Meteor Head
      <span
        key={idx}
        className={cn(
          "pointer-events-none absolute -top-2 size-1 rotate-215 animate-meteor rounded-full bg-white shadow-[0_0_10px_#60a5fa,0_0_20px_#60a5fa]"
        )}
        style={{
          left: style.left,
          animationDelay: style.animationDelay,
          animationDuration: style.animationDuration,
        }}>
        {/* Meteor Tail */}
        <div
          className="pointer-events-none absolute top-1/2 -z-10 h-0.5 w-[60px] -translate-y-1/2 bg-linear-to-r from-blue-400 via-blue-200 to-transparent" />
      </span>
    ))}
  </>);
};

export default Meteors;

