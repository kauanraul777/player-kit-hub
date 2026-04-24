import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, UPSELL_PRICE } from "@/context/CartContext";
import { Minus, Plus, Trash2, Gift, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import albumFifa from "@/assets/album-fifa-2026.png";

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function CartSheet() {
  const cart = useCart();
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, subtotal, upsellApplied, applyUpsell } = cart;

  const jerseyItems = items.filter((i) => !i.isBonus);

  const handleApplyUpsell = () => {
    if (jerseyItems.length === 0) {
      toast.error("Adicione ao menos 1 camisa antes de aplicar a oferta");
      return;
    }
    applyUpsell(jerseyItems);
    toast.success("Oferta aplicada com sucesso");
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    toast.success("Redirecionando para o checkout...");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-background">
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle className="font-display text-xl text-deep flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Seu carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-border/60 last:border-0">
                  <div className="w-16 h-16 flex-shrink-0 rounded-md bg-muted overflow-hidden">
                    <img
                      src={item.isBonus ? albumFifa : item.img}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
                          {item.team}
                        </p>
                        <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                      </div>
                      {!item.isBonus && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {item.isBonus ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success uppercase tracking-wide">
                          <Gift className="w-3 h-3" /> Brinde
                        </span>
                      ) : (
                        <div className="inline-flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <span className="text-sm font-semibold text-deep">
                        {item.isBonus ? "Grátis" : formatBRL(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* UPSELL */}
              {!upsellApplied && (
                <div className="rounded-lg border border-gold/50 bg-gold/5 p-4">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-deep">
                      Oferta especial
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Leve 2 camisas + álbum da Copa + 5 pacotes de figurinhas
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Por apenas{" "}
                    <span className="font-bold text-success text-sm">{formatBRL(UPSELL_PRICE)}</span>
                  </p>
                  <button
                    onClick={handleApplyUpsell}
                    className="w-full bg-deep text-deep-foreground py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-primary transition-colors"
                  >
                    Aproveitar oferta
                  </button>
                </div>
              )}
              {upsellApplied && (
                <div className="rounded-lg border border-success/40 bg-success/5 p-3 text-xs text-success font-medium flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Oferta aplicada — total ajustado para {formatBRL(UPSELL_PRICE)}
                </div>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3 bg-card">
            {upsellApplied && subtotal !== total && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Subtotal</span>
                <span className="line-through">{formatBRL(subtotal)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl text-deep">{formatBRL(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-success text-success-foreground py-3.5 rounded-md text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Finalizar compra
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
