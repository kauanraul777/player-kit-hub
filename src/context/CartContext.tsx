import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  team: string;
  img: string;
  price: number;
  quantity: number;
  isBonus?: boolean;
};

const STORAGE_KEY = "futfanaticos:cart:v1";
export const UPSELL_PRICE = 234.9;
export const UPSELL_BONUS_ID = "bonus-album-fifa";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  upsellApplied: boolean;
};

type CartContextValue = CartState & {
  open: () => void;
  close: () => void;
  setOpen: (v: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  applyUpsell: (jerseys: Omit<CartItem, "quantity">[]) => void;
  totalItems: number;
  subtotal: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [upsellApplied, setUpsellApplied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items ?? []);
        setUpsellApplied(parsed.upsellApplied ?? false);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, upsellApplied }));
    } catch {
      // ignore
    }
  }, [items, upsellApplied, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...item, quantity: qty }];
    });
    // Manual add disables the upsell pricing override
    setUpsellApplied(false);
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setUpsellApplied(false);
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    setUpsellApplied(false);
  };

  const clear = () => {
    setItems([]);
    setUpsellApplied(false);
  };

  const applyUpsell: CartContextValue["applyUpsell"] = (jerseys) => {
    // Replace cart with exactly 2 jerseys (use first 2 provided) + bonus item
    const picks = jerseys.slice(0, 2).map((j) => ({ ...j, quantity: 1 }));
    if (picks.length < 2 && picks.length > 0) {
      picks.push({ ...picks[0], quantity: 1 });
    }
    const bonus: CartItem = {
      id: UPSELL_BONUS_ID,
      name: "Álbum FIFA 2026 + 5 pacotes de figurinhas",
      team: "Brinde",
      img: "",
      price: 0,
      quantity: 1,
      isBonus: true,
    };
    setItems(picks.length ? [...picks, bonus] : []);
    setUpsellApplied(picks.length >= 1);
  };

  const totalItems = items.reduce((s, i) => s + (i.isBonus ? 0 : i.quantity), 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = upsellApplied ? UPSELL_PRICE : subtotal;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      upsellApplied,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      setOpen: setIsOpen,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      applyUpsell,
      totalItems,
      subtotal,
      total,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, isOpen, upsellApplied],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
