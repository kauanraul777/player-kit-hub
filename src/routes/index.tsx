import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Shield,
  Truck,
  Sparkles,
  Wind,
  Award,
  Star,
  Check,
  ChevronRight,
  Gift,
  Lock,
  ShoppingCart,
  Zap,
  Heart,
} from "lucide-react";

import heroJerseys from "@/assets/hero-jerseys.jpg";
import jerseyBrazil from "@/assets/jersey-brazil.jpg";
import jerseyArgentina from "@/assets/jersey-argentina.jpg";
import jerseyFrance from "@/assets/jersey-france.jpg";
import jerseyPortugal from "@/assets/jersey-portugal.jpg";
import jerseyGermany from "@/assets/jersey-germany.jpg";
import detailFabric from "@/assets/detail-fabric.jpg";
import detailPerson from "@/assets/detail-person.jpg";
import bonusAlbum from "@/assets/bonus-album.jpg";

import { CountdownTimer } from "@/components/CountdownTimer";
import { StockCounter } from "@/components/StockCounter";
import { RecentPurchasePopup } from "@/components/RecentPurchasePopup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Camisa Modelo Jogador R$ 99,90 — Seleções Premium" },
      {
        name: "description",
        content:
          "Camisas tailandesas premium das principais seleções. Compre 2 por R$ 99,90 cada e ganhe álbum da Copa + 5 pacotes de figurinhas. Oferta por tempo limitado.",
      },
      { property: "og:image", content: "/og-image.jpg" },
    ],
  }),
  component: LandingPage,
});

const TEAMS = [
  { id: "br", name: "Brasil", flag: "🇧🇷", img: jerseyBrazil, accent: "from-yellow-400 to-green-500" },
  { id: "ar", name: "Argentina", flag: "🇦🇷", img: jerseyArgentina, accent: "from-sky-300 to-sky-500" },
  { id: "fr", name: "França", flag: "🇫🇷", img: jerseyFrance, accent: "from-blue-700 to-red-600" },
  { id: "pt", name: "Portugal", flag: "🇵🇹", img: jerseyPortugal, accent: "from-red-700 to-green-600" },
  { id: "de", name: "Alemanha", flag: "🇩🇪", img: jerseyGermany, accent: "from-zinc-800 to-zinc-300" },
];

const BENEFITS = [
  { icon: Award, title: "Modelo Jogador", desc: "Idêntica à usada em campo" },
  { icon: Wind, title: "Tecido Dry-Fit", desc: "Respirável e leve" },
  { icon: Shield, title: "Alta Durabilidade", desc: "Acabamento premium" },
  { icon: Sparkles, title: "Conforto Extremo", desc: "Caimento perfeito" },
  { icon: Truck, title: "Entrega Brasil", desc: "Para todo o país" },
];

const REVIEWS = [
  {
    name: "Carlos M.",
    rating: 5,
    text: "Qualidade absurda, parece original! Tecido muito bom, costuras impecáveis. Recomendo demais.",
    verified: true,
  },
  {
    name: "Ricardo S.",
    rating: 5,
    text: "Comprei 2 e ainda ganhei o álbum, vale muito a pena. Meu filho amou as figurinhas.",
    verified: true,
  },
  {
    name: "André P.",
    rating: 5,
    text: "Chegou rápido e vestiu perfeito. Já é a terceira que compro aqui, sempre satisfeito.",
    verified: true,
  },
];

function scrollToOffer() {
  document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
}

function LandingPage() {
  const [selected, setSelected] = useState<string>("br");

  return (
    <div className="min-h-screen bg-background">
      {/* Top urgency bar */}
      <div className="bg-deep text-deep-foreground text-center text-xs sm:text-sm py-2 px-3 font-medium">
        🔥 <span className="font-bold text-gold">OFERTA RELÂMPAGO:</span> Compre 2 e ganhe álbum + figurinhas
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#" className="font-display text-xl tracking-wide text-deep">
            FUT<span className="text-success">CLASSICS</span>
          </a>
          <button
            onClick={scrollToOffer}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-cta text-success-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-cta hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar agora
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-deep text-deep-foreground">
        <img
          src={heroJerseys}
          alt="Camisas premium das seleções de futebol"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-hero" />

        <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="max-w-2xl mx-auto text-center animate-slide-up">
            <span className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-3 py-1 rounded-full text-xs font-bold mb-5">
              <Zap className="w-3.5 h-3.5" /> EDIÇÃO LIMITADA 2025
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance mb-5">
              Camisas <span className="text-gold">Modelo Jogador</span> das Seleções Mais Desejadas
            </h1>

            <p className="text-base sm:text-lg text-deep-foreground/85 mb-7 text-balance max-w-xl mx-auto">
              Qualidade premium <strong className="text-gold">usada pelos jogadores</strong> em campo,
              por um preço que cabe no seu bolso.
            </p>

            <div className="bg-gradient-gold text-gold-foreground rounded-2xl p-5 mb-7 shadow-gold">
              <p className="text-xs font-bold uppercase tracking-wider mb-1">🎁 Oferta exclusiva</p>
              <p className="font-display text-xl sm:text-2xl leading-tight">
                Compre 2 camisas e ganhe<br />
                <span className="text-success-foreground bg-success px-2 py-0.5 inline-block mt-1 rounded">
                  ÁLBUM DA COPA + 5 PACOTES DE FIGURINHAS
                </span>
              </p>
            </div>

            <button
              onClick={scrollToOffer}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-cta text-success-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-cta hover:scale-[1.02] active:scale-95 transition-transform animate-pulse-ring"
            >
              COMPRAR AGORA
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-4 mt-5 text-xs text-deep-foreground/70">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Compra segura</span>
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Frete Brasil</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 7 dias garantia</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="font-display text-2xl text-deep">+50k</p>
            <p className="text-xs text-muted-foreground">Clientes felizes</p>
          </div>
          <div>
            <p className="font-display text-2xl text-deep">4.9★</p>
            <p className="text-xs text-muted-foreground">Avaliação média</p>
          </div>
          <div>
            <p className="font-display text-2xl text-deep">7 dias</p>
            <p className="text-xs text-muted-foreground">Garantia total</p>
          </div>
          <div>
            <p className="font-display text-2xl text-deep">Brasil</p>
            <p className="text-xs text-muted-foreground">Entrega nacional</p>
          </div>
        </div>
      </section>

      {/* ESCOLHA SUA SELEÇÃO */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-success font-bold text-sm uppercase tracking-wider mb-2">Passo 1</p>
            <h2 className="font-display text-3xl sm:text-5xl text-deep mb-3">
              Escolha sua seleção
            </h2>
            <p className="text-muted-foreground">As 5 seleções mais desejadas do mundo</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEAMS.map((t) => {
              const isActive = selected === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`group relative bg-card rounded-2xl overflow-hidden text-left transition-all duration-300 ${
                    isActive
                      ? "ring-2 ring-success shadow-cta -translate-y-1"
                      : "shadow-soft hover:shadow-card hover:-translate-y-1"
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={t.img}
                      alt={`Camisa ${t.name} modelo jogador`}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {isActive && (
                    <div className="absolute top-3 right-3 bg-success text-success-foreground rounded-full w-7 h-7 flex items-center justify-center shadow-cta animate-slide-in">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="font-display text-lg text-deep flex items-center justify-between">
                      <span>{t.flag} {t.name}</span>
                    </p>
                    <p
                      className={`mt-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive ? "text-success" : "text-muted-foreground group-hover:text-success"
                      }`}
                    >
                      {isActive ? "✓ Selecionada" : "Selecionar →"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center gap-2 bg-deep text-deep-foreground px-6 py-3 rounded-xl font-bold shadow-card hover:bg-primary transition-colors"
            >
              Continuar para a oferta <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-card border-y border-border py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl text-deep mb-2">
              Por que nossas camisas?
            </h2>
            <p className="text-muted-foreground">Premium em cada detalhe</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="text-center p-4 rounded-xl bg-background hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base text-deep mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={detailFabric}
              alt="Detalhe do tecido dry-fit premium"
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              O que é tailandesa premium?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-deep mb-4 leading-tight">
              Acabamento <span className="text-success">impecável</span>, custo <span className="text-success">muito menor</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              As versões tailandesas premium são conhecidas mundialmente pelo
              acabamento <strong className="text-foreground">idêntico</strong> ao das versões oficiais —
              tecido dry-fit, costuras reforçadas, escudo bordado e numeração termocolada de alta qualidade.
            </p>
            <ul className="space-y-2">
              {[
                "Mesmo tecido respirável usado pelos jogadores",
                "Escudo e patrocínios em alta resolução",
                "Caimento atlético modelo jogador",
                "Por uma fração do preço da oficial",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="bg-muted/40 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-deep mb-2">
              4.9 / 5 — milhares de torcedores
            </h2>
            <p className="text-muted-foreground">Veja o que estão dizendo</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-2xl p-5 shadow-soft">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-deep">{r.name}</span>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-success font-medium">
                      <Check className="w-3 h-3" /> Compra verificada
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center mb-8">
            Veja de perto
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[jerseyBrazil, detailFabric, detailPerson, jerseyArgentina, jerseyPortugal, jerseyFrance, jerseyGermany, bonusAlbum].map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted shadow-soft">
                <img
                  src={src}
                  alt="Detalhe da coleção"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA PRINCIPAL */}
      <section id="oferta" className="bg-gradient-offer text-deep-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-float">
              <Gift className="w-4 h-4" /> Oferta com brinde
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-3 text-balance">
              Leve 2 camisas + ganhe <span className="text-gold">álbum da copa</span> + 5 pacotes de figurinhas
            </h2>
          </div>

          <div className="bg-card text-foreground rounded-3xl overflow-hidden shadow-card">
            <div className="grid md:grid-cols-2">
              <div className="bg-muted/30">
                <img
                  src={bonusAlbum}
                  alt="Álbum da Copa e pacotes de figurinhas como brinde"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover min-h-[260px]"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-muted-foreground line-through">De R$ 199,90</span>
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded">
                    -50%
                  </span>
                </div>
                <p className="font-display text-5xl sm:text-6xl text-success leading-none mb-1">
                  R$ 99,90
                </p>
                <p className="text-sm text-muted-foreground mb-5">cada camisa · em até 12x no cartão</p>

                <div className="bg-gold/15 border border-gold/40 rounded-xl p-4 mb-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-deep mb-2">
                    🎁 Você leva no combo:
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> 2 Camisas modelo jogador</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> 1 Álbum oficial da Copa</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> 5 Pacotes de figurinhas</li>
                  </ul>
                </div>

                <p className="text-center text-xs font-bold text-destructive uppercase tracking-wider mb-2">
                  ⏰ Oferta termina em:
                </p>
                <CountdownTimer />

                <button className="mt-6 w-full bg-gradient-cta text-success-foreground py-4 rounded-xl font-bold text-lg shadow-cta hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  QUERO MEU COMBO
                </button>
                <p className="text-center text-[11px] text-muted-foreground mt-3">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Pagamento 100% seguro · Pix, cartão e boleto
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <StockCounter />
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-14 px-4 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex w-20 h-20 rounded-full bg-success/10 items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-deep mb-3">
            7 dias de garantia ou seu dinheiro de volta
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Se a sua camisa não chegar perfeita ou você não amar o produto, devolvemos
            100% do seu dinheiro em até 7 dias. Sem perguntas.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-deep text-deep-foreground py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={detailPerson}
            alt=""
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <Heart className="w-10 h-10 text-gold mx-auto mb-4 animate-float" />
          <h2 className="font-display text-3xl sm:text-5xl mb-4 text-balance">
            Última chance — vista a camisa do seu time
          </h2>
          <p className="text-deep-foreground/80 mb-8 text-lg">
            Estoque limitado. Brinde garantido apenas hoje.
          </p>
          <button
            onClick={scrollToOffer}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-cta text-success-foreground px-8 py-5 rounded-xl font-bold text-lg sm:text-xl shadow-cta hover:scale-[1.02] active:scale-95 transition-transform animate-pulse-ring"
          >
            QUERO MINHAS CAMISAS + BRINDE AGORA
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-deep-foreground/70 flex-wrap">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Pagamento seguro</span>
            <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Frete para todo Brasil</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 7 dias garantia</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-xs text-muted-foreground">
          <p className="font-display text-lg text-deep mb-2">
            FUT<span className="text-success">CLASSICS</span>
          </p>
          <p className="mb-2">contato@futclassics.com.br · CNPJ 00.000.000/0001-00</p>
          <p className="mb-3">Pagamentos: Pix, Cartão de Crédito (até 12x), Boleto</p>
          <p className="max-w-xl mx-auto opacity-80">
            Aviso legal: produto não oficial, inspirado em camisas de seleções de futebol.
            Marcas e escudos pertencem aos seus respectivos proprietários.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} FutClassics. Todos os direitos reservados.</p>
        </div>
      </footer>

      <RecentPurchasePopup />
    </div>
  );
}
