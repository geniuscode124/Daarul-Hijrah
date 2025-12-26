import Link from "next/link";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Use a simple icon or text for now, assuming logo is an image or SVg */}
          <div className="h-8 w-8 text-primary">
             {/* Logo Placeholder - leaf icon or similar */}
             <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                <path d="M12 2C7.5 2 4 6.5 4 12c0 5 3.5 9 8 9s8-4 8-9c0-5.5-3.5-9-8-9zm0 16c-3.5 0-6-3-6-7s2.5-7 6-7 6 3 6 7-2.5 7-6 7z" />
             </svg>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-primary">
            Daarul-Hijrah
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Courses
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Log In
          </Link>
          <Link
            href="#"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
      </div>
    </header>
  );
}
