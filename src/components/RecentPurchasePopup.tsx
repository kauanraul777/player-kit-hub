import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

const PURCHASES = [
  { name: "Lucas", city: "São Paulo, SP", item: "Camisa Brasil" },
  { name: "Mateus", city: "Rio de Janeiro, RJ", item: "Camisa Argentina" },
  { name: "Pedro", city: "Belo Horizonte, MG", item: "Camisa França" },
  { name: "João", city: "Curitiba, PR", item: "Camisa Portugal" },
  { name: "Felipe", city: "Salvador, BA", item: "Camisa Alemanha" },
  { name: "Rafael", city: "Fortaleza, CE", item: "Combo 2 camisas" },
  { name: "Bruno", city: "Porto Alegre, RS", item: "Camisa Brasil" },
  { name: "Gabriel", city: "Recife, PE", item: "Combo 2 camisas" },
];

export function RecentPurchasePopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setVisible(true);
      timeout = setTimeout(() => {
        setVisible(false);
        timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % PURCHASES.length);
          cycle();
        }, 12000);
      }, 4500);
    };
    const start = setTimeout(cycle, 8000);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, []);

  const p = PURCHASES[index];
  const minutes = 2 + (index % 9);

  return (
    <div
      className={`fixed left-3 bottom-3 z-50 max-w-[320px] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 rounded-xl bg-card shadow-card border border-border p-3 pr-8 relative">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {p.name} de {p.city}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            comprou: <span className="font-medium text-foreground">{p.item}</span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">há {minutes} minutos · ✓ verificado</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
