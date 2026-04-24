import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export function StockCounter() {
  const [stock, setStock] = useState(27);

  useEffect(() => {
    const id = setInterval(() => {
      setStock((s) => {
        if (s <= 8) return s;
        return Math.random() > 0.6 ? s - 1 : s;
      });
    }, 9000);
    return () => clearInterval(id);
  }, []);

  const pct = Math.max(8, (stock / 50) * 100);

  return (
    <div className="bg-card border-2 border-destructive/30 rounded-2xl p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-5 h-5 text-destructive animate-pulse" />
        <p className="font-display text-lg text-destructive">
          Apenas {stock} unidades restantes!
        </p>
      </div>
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-destructive to-gold transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        🔥 Alta demanda — estoque quase esgotado
      </p>
    </div>
  );
}
