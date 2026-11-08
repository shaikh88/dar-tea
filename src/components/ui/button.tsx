import type { ButtonHTMLAttributes } from "react";

export const primaryLinkClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-estate px-6 py-3 text-sm font-semibold text-surface shadow-card transition-colors duration-200 hover:bg-leaf";
export const secondaryLinkClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-estate bg-transparent px-6 py-3 text-sm font-semibold text-estate transition-colors duration-200 hover:bg-mist";

export function Button({
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`${primaryLinkClass} disabled:cursor-not-allowed disabled:bg-line disabled:text-muted ${className}`}
      {...props}
    />
  );
}
