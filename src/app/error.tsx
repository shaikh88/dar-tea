"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error({ event: "page_render_failed", message: error.message, digest: error.digest });
  }, [error]);
  return <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="text-4xl font-bold">We could not load this page</h1><p role="alert" className="mt-6 text-muted">An unexpected error occurred. Please try again.</p><Button onClick={reset} className="mt-8">Try again</Button></div>;
}
