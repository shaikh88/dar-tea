import type { ReactNode } from "react";
import { AccountNavigation } from "@/modules/customers/components/account-navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 bg-background text-ink">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-7 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
              Darjeeling
            </p>
            <p className="mt-1 text-sm text-muted">Customer account</p>
          </div>
          <AccountNavigation />
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <aside
          aria-label="Demo information"
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950"
        >
          <span className="font-semibold">Demo only.</span> No authentication,
          real customer data, saving, or profile and address editing is enabled
          on these screens.
        </aside>
        {children}
      </div>
    </div>
  );
}
