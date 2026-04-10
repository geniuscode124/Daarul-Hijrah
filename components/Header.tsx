"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Loader2, LogOut, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header({ initialSession }: { initialSession?: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: clientSession, isPending } = authClient.useSession();
  
  const activeSession = isPending ? initialSession : (clientSession ?? initialSession);
  const showLoader = isPending && initialSession === undefined;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed", err);
      toast.error("Sign out failed. Please try again.");
    }
  };
  
  return (
    <>
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

        {/* Right Section - Auth Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {showLoader ? (
            <div className="h-10 w-24 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : activeSession ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:bg-muted cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex flex-1 justify-end">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-[100] lg:hidden">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        
        {/* Dialog */}
        <div className="fixed inset-y-0 right-0 z-100 w-full h-dvh overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif text-xl font-bold tracking-tight text-primary">
                Daarul-Hijrah
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Events</Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Newsletter</Link>
              </div>
              
              <div className="py-6">
                {showLoader ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : activeSession ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-foreground hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="-mx-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-muted-foreground hover:bg-gray-50"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-foreground hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-gray-50"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
