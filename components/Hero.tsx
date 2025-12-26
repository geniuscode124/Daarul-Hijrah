// import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24">
        {/* Text Content */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary sm:text-6xl">
            Learn Islam —
            <span className="block text-accent mt-2">Anywhere, Anytime</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Your gateway to authentic Islamic knowledge. Accessible, comprehensive,
            and designed for the modern learner.
          </p>
          <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative h-64 w-full sm:h-80 lg:w-[32rem] lg:h-[20rem] rounded-xl overflow-hidden shadow-xl bg-gray-900 ring-1 ring-gray-400/10">
               {/* Placeholder for Quran Image */}
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                    <p className="text-white/90 font-serif text-2xl font-semibold px-4 text-center">Embark on Your Journey</p>
               </div>
               
               {/* Fallback pattern or color if image fails, or use a placeholder service */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1729625682211-193d563037e8?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
