import Link from "next/link";
import { primaryLinkClass } from "@/components/ui/button";

export default function NotFound() {
  return <div className="mx-auto max-w-3xl px-6 py-20 text-center"><p className="text-sm text-leaf">404 / A different path</p><h1 className="mt-4 text-4xl font-bold">This page is not in our collection</h1><p className="mt-6 text-muted">The tea or page you are looking for could not be found.</p><Link href="/products" className={`${primaryLinkClass} mt-8`}>Explore our teas</Link></div>;
}
