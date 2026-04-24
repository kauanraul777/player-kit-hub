import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { CartSheet } from "@/components/CartSheet";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FutFanaticos — Camisas Modelo Jogador Copa 2026" },
      { name: "description", content: "Camisas modelo jogador das seleções para a Copa do Mundo 2026. Brasil, Argentina, França, Portugal e Alemanha. Qualidade premium e frete para todo o Brasil." },
      { name: "theme-color", content: "#1b2a52" },
      { property: "og:title", content: "FutFanaticos — Camisas Modelo Jogador Copa 2026" },
      { property: "og:description", content: "Camisas modelo jogador das seleções para a Copa do Mundo 2026. Brasil, Argentina, França, Portugal e Alemanha. Qualidade premium e frete para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FutFanaticos — Camisas Modelo Jogador Copa 2026" },
      { name: "twitter:description", content: "Camisas modelo jogador das seleções para a Copa do Mundo 2026. Brasil, Argentina, França, Portugal e Alemanha. Qualidade premium e frete para todo o Brasil." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/245265b1-b3ab-4155-a776-ec1a10281eb3/id-preview-b08acb8a--789f95a5-0e9f-4176-8e05-1d5bb7abd700.lovable.app-1777066934182.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/245265b1-b3ab-4155-a776-ec1a10281eb3/id-preview-b08acb8a--789f95a5-0e9f-4176-8e05-1d5bb7abd700.lovable.app-1777066934182.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <Outlet />
      <CartSheet />
      <Toaster position="top-center" richColors />
    </CartProvider>
  );
}
