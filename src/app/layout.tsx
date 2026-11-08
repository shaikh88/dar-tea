import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/modules/cart/components/cart-provider";
import { getCatalog } from "@/modules/catalog/services/catalog-service";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Darjeeling | The Estate Collection", template: "%s | Darjeeling" },
  description: "Explore a demo collection of single-estate Darjeeling teas, from bright spring harvests to rich autumnal cups.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CartProvider products={getCatalog().products}>
          <SiteHeader />
          <main id="main-content" className="flex-1">{children}</main>
          <footer className="mt-16 border-t border-leaf bg-estate px-6 py-12 text-surface">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row">
              <div><span aria-hidden="true" className="mb-6 block h-px w-12 bg-amber" /><p className="font-serif text-3xl">Good tea. A slower moment.</p><p className="mt-3 text-sm text-mist">Darjeeling estate collection - frontend demo.</p></div>
              <div className="text-sm text-mist"><Link href="/products" className="text-surface underline decoration-amber underline-offset-4 hover:decoration-surface focus-visible:outline-surface">Explore the collection</Link><p className="mt-3">INR pricing. No checkout. Cart resets on reload.</p></div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
