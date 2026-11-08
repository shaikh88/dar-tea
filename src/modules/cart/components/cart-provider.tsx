"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Product } from "../../catalog/validators/catalog";
import { changeCart, getCartLines, getCartSubtotal, type CartItem, type CartLine } from "../services/cart-service";

type CartAction = { type: "add" | "set" | "remove"; sku: string; quantity: number; products: Product[] };
type CartState = { items: CartItem[]; message: string; error: string };
type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  message: string;
  error: string;
  addItem: (sku: string, quantity: number) => void;
  setQuantity: (sku: string, quantity: number) => void;
  removeItem: (sku: string) => void;
};

function reducer(state: CartState, action: CartAction): CartState {
  const result = changeCart(state.items, action.products, action.sku, action.quantity, action.type);
  if (!result.success) return { ...state, error: result.error, message: "" };
  return {
    items: result.items,
    error: "",
    message: action.type === "add" ? "Added to your cart." : action.type === "remove" ? "Item removed from your cart." : "Cart quantity updated.",
  };
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], message: "", error: "" });
  const lines = getCartLines(state.items, products);
  const value: CartContextValue = {
    lines,
    count: lines.reduce((count, item) => count + item.quantity, 0),
    subtotal: getCartSubtotal(lines),
    message: state.message,
    error: state.error,
    addItem: (sku, quantity) => dispatch({ type: "add", sku, quantity, products }),
    setQuantity: (sku, quantity) => dispatch({ type: "set", sku, quantity, products }),
    removeItem: (sku) => dispatch({ type: "remove", sku, quantity: 0, products }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
