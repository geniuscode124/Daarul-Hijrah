import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl shadow-sm transition-transform group-hover:scale-105">
               <Image 
                 src="/logo.png" 
                 alt="Daarul-Hijrah Logo" 
                 fill 
                 className="object-cover"
               />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-primary group-hover:text-primary/80 transition-colors">
              Daarul-Hijrah
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center justify-center gap-10">
          <Link href="#" className="text-base font-medium text-foreground hover:text-primary transition-colors font-serif border-b-2 border-accent/0 hover:border-accent">
            Home
          </Link>
          <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors font-serif border-b-2 border-accent/0 hover:border-accent">
            About
          </Link>
          <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors font-serif border-b-2 border-accent/0 hover:border-accent">
            Courses
          </Link>
          <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors font-serif border-b-2 border-accent/0 hover:border-accent">
            Events
          </Link>
          <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors font-serif border-b-2 border-accent/0 hover:border-accent">
            Newsletter
          </Link>
        </nav>

        {/* Right Section - Contact Us */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#" className="text-base font-medium text-foreground hover:text-primary transition-colors font-serif border-b-2 border-accent/0 hover:border-accent">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex flex-1 justify-end">
            <button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
      </div>
    </header>
  );
}
