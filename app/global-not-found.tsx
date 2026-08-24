import type { Metadata } from "next";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: "Page not found — NovaMart",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
          <p className="text-64 font-extrabold text-brand-primary">404</p>
          <h1 className="text-28 font-bold sm:text-36">
            This page could not be found
          </h1>
          <p className="max-w-md text-sm text-neutral-grey">
            The page you are looking for does not exist or may have been moved.
          </p>
          <a
            href="/"
            className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shade-s2"
          >
            Back to store
          </a>
        </main>
      </body>
    </html>
  );
}
