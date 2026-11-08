import type { ReactNode } from "react";
import { AdminNavigation } from "@/modules/admin/components/admin-navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 bg-background text-ink">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                Darjeeling
              </p>
              <p className="mt-1 text-sm text-muted">Admin workspace</p>
            </div>
            <span className="rounded-xl bg-mist px-3 py-1 text-xs font-medium text-muted">
              Phase 1 demo
            </span>
          </div>
          <AdminNavigation />
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <aside
          aria-label="Demo information"
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950"
        >
          <span className="font-semibold">Public demo only.</span> There is no
          authentication, real data, saving, or create, edit, archive, or delete
          actions here.
        </aside>
        {children}
      </div>
    </div>
  );
}
