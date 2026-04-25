import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Shield,
  Truck,
  Lock,
  Star,
  Check,
  ChevronRight,
  Gift,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

import albumFifa from "@/assets/album-fifa-2026.png";
import brasilHome from "@/assets/brasil-home.png";
import brasilAway from "@/assets/brasil-away.png";
import argentinaHome from "@/assets/argentina-home.png";
import argentinaAway from "@/assets/argentina-away.png";
import francaHome from "@/assets/franca-home.png";
import francaAway from "@/assets/franca-away.png";
import portugalHome from "@/assets/portugal-home.png";
import portugalAway from "@/assets/portugal-away.png";
import alemanhaHome from "@/assets/alemanha-home.png";
import alemanhaAway from "@/assets/alemanha-away.png";
import holandaHome from "@/assets/holanda-home.png";
import holandaAway from "@/assets/holanda-away.png";
import espanhaHome from "@/assets/espanha-home.png";
import espanhaAway from "@/assets/espanha-away.png";
import inglaterraHome from "@/assets/inglaterra-home.png";
import inglaterraAway from "@/assets/inglaterra-away.png";

import { RecentPurchasePopup } from "@/components/RecentPurchasePopup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FutFanaticos — Camisas Modelo Jogador Copa 2026" },
      {
        name: "description",
        content:
          "Loja oficial de camisas modelo jogador das principais seleções para a Copa do Mundo 2026. Brasil, Argentina, França, Portugal, Alemanha, Holanda, Espanha e Inglaterra.",
      },
      { property: "og:title", content: "FutFanaticos — Camisas das Seleções Copa 2026" },
      {
        property: "og:description",
        content:
          "Modelos jogador com qualidade premium das principais seleções. Caimento perfeito e preço acessível.",
      },
    ],
  }),
  component: StorePage,
});

type Product = {
  id: string;
  team: string;
  flag: string;
  model: string;
  img: string;
  price: number;
  oldPrice: number;
};

const PRODUCTS: Product[] = [
  { id: "br-1", team: "Brasil", flag: "🇧🇷", model: "Seleção Brasileira Modelo 1 Jogador", img: brasilHome, price: 99.9, oldPrice: 199.9 },
  { id: "br-2", team: "Brasil", flag: "🇧🇷", model: "Seleção Brasileira Modelo 2 Jogador", img: brasilAway, price: 99.9, oldPrice: 199.9 },
  { id: "ar-1", team: "Argentina", flag: "🇦🇷", model: "Seleção Argentina Modelo 1 Jogador", img: argentinaHome, price: 99.9, oldPrice: 199.9 },
  { id: "ar-2", team: "Argentina", flag: "🇦🇷", model: "Seleção Argentina Modelo 2 Jogador", img: argentinaAway, price: 99.9, oldPrice: 199.9 },
  { id: "fr-1", team: "França", flag: "🇫🇷", model: "Seleção França Modelo 1 Jogador", img: francaHome, price: 99.9, oldPrice: 199.9 },
  { id: "fr-2", team: "França", flag: "🇫🇷", model: "Seleção França Modelo 2 Jogador", img: francaAway, price: 99.9, oldPrice: 199.9 },
  { id: "pt-1", team: "Portugal", flag: "🇵🇹", model: "Seleção Portugal Modelo 1 Jogador", img: portugalHome, price: 99.9, oldPrice: 199.9 },
  { id: "pt-2", team: "Portugal", flag: "🇵🇹", model: "Seleção Portugal Modelo 2 Jogador", img: portugalAway, price: 99.9, oldPrice: 199.9 },
  { id: "de-1", team: "Alemanha", flag: "🇩🇪", model: "Seleção Alemanha Modelo 1 Jogador", img: alemanhaHome, price: 99.9, oldPrice: 199.9 },
  { id: "de-2", team: "Alemanha", flag: "🇩🇪", model: "Seleção Alemanha Modelo 2 Jogador", img: alemanhaAway, price: 99.9, oldPrice: 199.9 },
  { id: "nl-1", team: "Holanda", flag: "🇳🇱", model: "Seleção Holanda Modelo 1 Jogador", img: holandaHome, price: 99.9, oldPrice: 199.9 },
  { id: "nl-2", team: "Holanda", flag: "🇳🇱", model: "Seleção Holanda Modelo 2 Jogador", img: holandaAway, price: 99.9, oldPrice: 199.9 },
  { id: "es-1", team: "Espanha", flag: "🇪🇸", model: "Seleção Espanha Modelo 1 Jogador", img: espanhaHome, price: 99.9, oldPrice: 199.9 },
  { id: "es-2", team: "Espanha", flag: "🇪🇸", model: "Seleção Espanha Modelo 2 Jogador", img: espanhaAway, price: 99.9, oldPrice: 199.9 },
  { id: "en-1", team: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", model: "Seleção Inglaterra Modelo 1 Jogador", img: inglaterraHome, price: 99.9, oldPrice: 199.9 },
  { id: "en-2", team: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", model: "Seleção Inglaterra Modelo 2 Jogador", img: inglaterraAway, price: 99.9, oldPrice: 199.9 },
];

const TEAM_ORDER = ["Brasil", "Argentina", "França", "Portugal", "Alemanha", "Holanda", "Espanha", "Inglaterra"];

function scrollToProducts() {
  document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function StorePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* TRUST BAR */}
      <div className="bg-deep text-deep-foreground text-[11px] sm:text-xs">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center gap-3 sm:gap-8 flex-wrap">
          <span className="flex items-center gap-1.5 opacity-90">
            <Truck className="w-3.5 h-3.5" /> Frete Brasil
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <Lock className="w-3.5 h-3.5" /> Pagamento seguro
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <Shield className="w-3.5 h-3.5" /> 7 dias garantia
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <a href="/" className="font-display text-lg sm:text-2xl tracking-wide text-deep flex-shrink-0">
            FUT<span className="text-success">FANATICOS</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/80">
            <button onClick={scrollToProducts} className="hover:text-deep transition-colors">Produtos</button>
            <a href="#oferta" className="hover:text-deep transition-colors">Promoções</a>
            <a href="#garantia" className="hover:text-deep transition-colors">Garantia</a>
          </nav>
          <div className="flex items-center gap-2">
            <CartButton />
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border text-deep hover:bg-muted transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-background">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 text-sm">
              <button
                onClick={() => handleNavClick(scrollToProducts)}
                className="text-left px-3 py-3 rounded-md hover:bg-muted text-foreground/85"
              >
                Produtos
              </button>
              <a
                href="#oferta"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-md hover:bg-muted text-foreground/85"
              >
                Promoções
              </a>
              <a
                href="#garantia"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-md hover:bg-muted text-foreground/85"
              >
                Garantia
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-background to-muted/40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24 text-center">
          <span className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-success mb-4 sm:mb-5">
            Coleções Seleções 2026 Copa do Mundo
          </span>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-deep leading-[1.1] text-balance mb-4 sm:mb-5">
            A camisa modelo jogador<br className="hidden sm:block" />
            <span className="text-success">tailandesa</span> mais desejada do momento
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto mb-7 sm:mb-8 px-2">
            Modelos jogador com qualidade premium das principais seleções.
          </p>
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-deep text-deep-foreground px-7 sm:px-8 py-3 sm:py-3.5 rounded-md font-medium text-sm tracking-wide uppercase hover:bg-primary transition-colors active:scale-[0.98]"
          >
            Ver modelos
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* small jersey strip */}
          <div className="mt-10 sm:mt-12 grid grid-cols-5 gap-2 sm:gap-6 max-w-2xl mx-auto opacity-90">
            {[brasilHome, argentinaHome, francaHome, portugalHome, alemanhaHome].map((src, i) => (
              <div key={i} className="aspect-square rounded-lg bg-card border border-border overflow-hidden">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-contain p-1.5 sm:p-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10 flex-wrap gap-3">
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-success mb-1.5 sm:mb-2">Catálogo</p>
              <h2 className="font-display text-2xl sm:text-4xl text-deep">Todas as seleções</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {PRODUCTS.length} modelos · Tamanhos P ao GG
            </p>
          </div>

          {TEAM_ORDER.map((team) => {
            const items = PRODUCTS.filter((p) => p.team === team);
            return (
              <div key={team} className="mb-10 sm:mb-12 last:mb-0">
                <h3 className="font-display text-lg sm:text-xl text-deep mb-4 sm:mb-5 flex items-center gap-2">
                  <span>{items[0]?.flag}</span> {team}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="bg-muted/40 border-y border-border py-12 sm:py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-5 sm:p-8 flex items-center gap-5 sm:gap-8 flex-col sm:flex-row">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
              <img src={albumFifa} alt="Álbum FIFA World Cup 2026" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 bg-gold/15 text-deep border border-gold/40 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Gift className="w-3 h-3" /> Brinde especial
              </span>
              <h3 className="font-display text-lg sm:text-2xl text-deep mb-1.5 leading-tight">
                Compre 2 camisas e ganhe um álbum + 5 pacotes de figurinhas
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Brinde adicionado automaticamente ao carrinho. Promoção por tempo limitado.
              </p>
            </div>
            <button
              onClick={scrollToProducts}
              className="bg-deep text-deep-foreground px-6 py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:bg-primary transition-colors active:scale-[0.98] w-full sm:w-auto"
            >
              Aproveitar
            </button>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-12 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { icon: Truck, title: "Frete Brasil", desc: "Enviamos para todo o país" },
            { icon: Lock, title: "Pagamento seguro", desc: "Pix, cartão e boleto" },
            { icon: Shield, title: "7 dias de garantia", desc: "Devolução facilitada" },
            { icon: Check, title: "Modelo jogador", desc: "Tecido dry-fit premium" },
          ].map((f) => (
            <div key={f.title} className="text-center sm:text-left">
              <div className="w-10 h-10 rounded-lg bg-muted text-deep flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <f.icon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm text-deep mb-1">{f.title}</h4>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="bg-muted/30 border-y border-border py-12 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <h2 className="font-display text-xl sm:text-3xl text-deep px-2">4.9 / 5 — milhares de torcedores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Carlos M.", text: "Qualidade absurda, parece original. Costuras impecáveis." },
              { name: "Ricardo S.", text: "Comprei 2 e ainda ganhei o álbum. Meu filho amou." },
              { name: "André P.", text: "Chegou rápido e vestiu perfeito. Já é a terceira que compro." },
            ].map((r) => (
              <div key={r.name} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground/85 mb-3 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-deep">{r.name}</span>
                  <span className="inline-flex items-center gap-1 text-success">
                    <Check className="w-3 h-3" /> Verificada
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section id="garantia" className="py-14 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex w-14 h-14 rounded-full bg-success/10 items-center justify-center mb-4">
            <Shield className="w-7 h-7 text-success" />
          </div>
          <h2 className="font-display text-xl sm:text-3xl text-deep mb-3">
            7 dias de garantia ou seu dinheiro de volta
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Se a camisa não chegar perfeita ou você não amar o produto, devolvemos 100% do seu dinheiro
            em até 7 dias após o recebimento.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-deep text-deep-foreground py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <p className="font-display text-xl mb-2">
                FUT<span className="text-gold">FANATICOS</span>
              </p>
              <p className="opacity-70 text-xs leading-relaxed">
                Loja especializada em camisas modelo jogador das principais seleções para a Copa do Mundo 2026.
              </p>
            </div>
            <div>
              <p className="font-display text-sm mb-3">Atendimento</p>
              <ul className="space-y-1.5 text-xs opacity-80">
                <li>contato@futfanaticos.com.br</li>
                <li>WhatsApp: (11) 99999-9999</li>
                <li>Seg a Sex · 9h às 18h</li>
              </ul>
            </div>
            <div>
              <p className="font-display text-sm mb-3">Pagamento e entrega</p>
              <ul className="space-y-1.5 text-xs opacity-80">
                <li>Pix, Cartão (até 12x), Boleto</li>
                <li>Frete para todo Brasil</li>
                <li>Entrega rastreada</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-deep-foreground/15 pt-5 text-[11px] opacity-60 text-center">
            <p className="mb-1">
              Aviso legal: produto não oficial, inspirado em camisas de seleções de futebol.
              Marcas e escudos pertencem aos seus respectivos proprietários.
            </p>
            <p>© {new Date().getFullYear()} FutFanaticos · CNPJ 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

      <RecentPurchasePopup />
    </div>
  );
}

function CartButton() {
  const { open, totalItems } = useCart();
  return (
    <button
      onClick={open}
      className="relative inline-flex items-center gap-2 bg-deep text-deep-foreground px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-primary transition-colors active:scale-[0.98]"
      aria-label="Abrir carrinho"
    >
      <ShoppingCart className="w-4 h-4" />
      <span className="hidden sm:inline">Carrinho</span>
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-success text-success-foreground text-[11px] font-bold flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, open } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.model,
      team: product.team,
      img: product.img,
      price: product.price,
    });
    toast.success("Produto adicionado ao carrinho");
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.model,
      team: product.team,
      img: product.img,
      price: product.price,
    });
    open();
  };

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-deep/30 hover:shadow-soft transition-all flex flex-col">
      <div className="aspect-square bg-muted/40 overflow-hidden relative">
        <img
          src={product.img}
          alt={`Camisa ${product.team} ${product.model} modelo jogador`}
          loading="lazy"
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-success text-success-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
          -50%
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
          {product.flag} {product.team}
        </p>
        <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2 min-h-[2.5rem]">
          {product.model}
        </h4>
        <p className="text-[11px] text-muted-foreground mb-3">
          Modelo jogador • Tecido premium • Alta qualidade
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base sm:text-lg font-bold text-deep">{formatBRL(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatBRL(product.oldPrice)}</span>
        </div>
        <div className="mt-auto space-y-2">
          <button
            onClick={handleBuyNow}
            className="w-full bg-deep text-deep-foreground py-3 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-success transition-colors active:scale-[0.98]"
          >
            Comprar agora
          </button>
          <button
            onClick={handleAdd}
            className="w-full border border-border bg-background text-foreground py-3 rounded-md text-xs font-medium uppercase tracking-wider hover:bg-muted transition-colors active:scale-[0.98] inline-flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
