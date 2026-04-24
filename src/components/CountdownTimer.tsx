import { useEffect, useState } from "react";

function getInitial() {
  // 23h 59m, decrementing
  return { h: 23, m: 47, s: 12 };
}

export function CountdownTimer() {
  const [t, setT] = useState(getInitial());

  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 sm:gap-3 justify-center">
      {[
        { label: "HORAS", v: pad(t.h) },
        { label: "MIN", v: pad(t.m) },
        { label: "SEG", v: pad(t.s) },
      ].map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="bg-deep text-deep-foreground font-display text-2xl sm:text-3xl px-3 py-2 rounded-lg min-w-[58px] sm:min-w-[70px] text-center tabular-nums shadow-soft">
            {u.v}
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground mt-1 tracking-wider">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
