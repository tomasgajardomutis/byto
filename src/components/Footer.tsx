import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-lg font-bold">
          <span className="text-aurora">{SITE.name}</span>
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            Desarrollo web · {SITE.city}
          </span>
        </p>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Byto</span>
          <Link to="/admin" className="transition-colors hover:text-primary">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
