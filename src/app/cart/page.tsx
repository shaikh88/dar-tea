import type { Metadata } from "next";
import { CartPageContent } from "@/modules/cart/components/cart-page";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  return <CartPageContent />;
}
