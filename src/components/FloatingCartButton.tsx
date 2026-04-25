import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function FloatingCartButton() {
  const { open, totalItems, isOpen } = useCart();

  if (isOpen) return null;

  return (
    <button
      onClick={open}
      aria-label={`Abrir carrinho${totalItems > 0 ? ` (${totalItems} ${totalItems === 1 ? "item" : "itens"})` : ""}`}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 inline-flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full bg-deep text-deep-foreground shadow-lg shadow-deep/30 hover:bg-primary hover:scale-105 active:scale-95 transition-all"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-success text-success-foreground text-[11px] font-bold flex items-center justify-center border-2 border-background">
          {totalItems}
        </span>
      )}
    </button>
  );
}
