import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function JungleHeader() {
  return (
    <header className="sticky top-0 z-20 w-full bg-emerald-900/80 backdrop-blur text-emerald-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-adventure text-xl">
          MediQuery
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/query">Quest</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/dashboard">Dashboard</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
