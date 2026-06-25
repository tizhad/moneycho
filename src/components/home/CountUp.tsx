"use client";

import { useEffect, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

export function CountUp({ value, duration = 700, format, className }: Props) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = display;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={className}>
      {format ? format(display) : Math.round(display).toString()}
    </span>
  );
}
