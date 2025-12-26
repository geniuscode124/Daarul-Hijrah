import Link from "next/link";
import Image from "next/image";
import { Check, Eye, ChevronDown } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Panel - Brand & Inspiration */}
      <div className="relative flex w-full flex-col justify-between bg-primary p-8 text-white lg:w-[45%] lg:p-12 xl:p-16">
         {/* Background pattern or slight texture overlay could go here */}
        
        {/* Logo */}
        <Link href="/" className="mb-12 flex items-center gap-3 w-fit">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/10 shadow-sm backdrop-blur-sm">
             <Image 
                 src="/logo.png" 
                 alt="Daarul-Hijrah Logo" 
                 fill 
                 className="object-cover"
               />
          </div>
          <span className="font-serif text-2xl font-bold">Daarul-Hijrah</span>
        </Link>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-md">
           <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              {/* Icon resembling the book/open Quran from the screenshot */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-accent">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
           </div>
           
           <blockquote className="mb-6 font-serif text-4xl font-medium leading-tight lg:text-5xl">
             "Seek knowledge from the cradle to the grave."
           </blockquote>
           
           <p className="text-lg leading-relaxed text-white/80">
             Join a community dedicated to lifelong learning. Manage your classes, track progress, and connect with qualified teachers in a trusted Islamic environment.
           </p>
           
           {/* Social Proof */}
           <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-4">
                 {/* Abstract/Icon Placeholders for Avatars */}
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-accent/20 backdrop-blur-md text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 opacity-80">
                         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                   </div>
                 ))}
              </div>
              <div>
                 <p className="font-bold text-white">2,000+ Students</p>
                 <p className="text-sm text-accent">Trust Daarul-Hijrah</p>
              </div>
           </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-xs text-white/40">
           &copy; {new Date().getFullYear()} Daarul-Hijrah Platform. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col justify-center bg-white p-8 lg:w-[55%] lg:p-12 xl:p-24">
         <div className="mx-auto w-full max-w-lg">
            <div className="mb-10 flex items-center justify-end text-sm">
               <span className="text-muted-foreground mr-2">Already have an account?</span>
               <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </div>
            
            <div className="mb-10">
               <h1 className="mb-2 font-serif text-4xl font-bold text-foreground">Create your account</h1>
               <p className="text-muted-foreground">Start your journey with us today.</p>
            </div>
            
            {/* Role Tab (Static) */}
            <div className="mb-8">
               <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Student Account
               </span>
            </div>
            
            <form className="space-y-6">
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                     <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-foreground">First Name</label>
                     <input type="text" id="firstName" placeholder="Yusuf" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                     <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-foreground">Last Name</label>
                     <input type="text" id="lastName" placeholder="Ali" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
               </div>
               
               <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    <input type="email" id="email" placeholder="name@example.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
               </div>
               
                <div>
                  <label htmlFor="grade" className="mb-2 block text-sm font-semibold text-foreground">Grade Level / Course Interest</label>
                  <div className="relative">
                    <select id="grade" className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary">
                       <option value="">Select a level</option>
                       <option value="beginner">Beginner</option>
                       <option value="intermediate">Intermediate</option>
                       <option value="advanced">Advanced</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                       <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
               </div>
               
               <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type="password" id="password" placeholder="Min. 8 characters" className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-11 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary" />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                       <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex gap-1">
                      <div className="h-1 flex-1 rounded-full bg-green-500"></div>
                      <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
                      <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
                      <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Must contain at least 8 characters, one symbol, and one number.</p>
               </div>
               
               <div className="flex items-start gap-3">
                  <div className="flex h-5 items-center">
                     <input id="terms" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  </div>
                  <label htmlFor="terms" className="text-sm text-foreground">
                     I agree to the <Link href="/terms" className="font-semibold underline hover:bg-black/5 hover:text-black hover:no-underline">Terms</Link> and <Link href="/privacy" className="font-semibold underline hover:bg-black/5 hover:text-black hover:no-underline">Privacy Policy</Link>
                  </label>
               </div>
               
               <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition-transform hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99]">
                  Create Account 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </button>
            </form>
            
            <div className="my-8 flex items-center gap-4">
               <div className="h-px flex-1 bg-gray-200"></div>
               <span className="text-xs font-semibold text-muted-foreground">OR CONTINUE WITH</span>
               <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            
            <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-3 font-medium text-foreground transition-colors hover:bg-gray-50">
               <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.7-.0667-1.3833-.1833-2.0333H12.0003v3.85h4.8333c-.2083 1.125-.85 2.075-1.8083 2.7167l2.925 2.2667c1.7167-1.5833 2.7083-3.9167 2.7083-6.6 0-.575-.05-1.125-.125-1.6667H12.0003v3.1334h3.1s.0333.1.0333.25c0 1.9333-1.5667 3.5-3.5 3.5-1.9333 0-3.5-1.5667-3.5-3.5s1.5667-3.5 3.5-3.5c.8833 0 1.6833.325 2.3083.8584l2.4583-2.4584C14.992 5.05 13.592 4.2 12.0003 4.2 7.7003 4.2 4.2003 7.7 4.2003 12s3.5 7.8 7.8 7.8" fill="#FC3F1D" fillRule="evenodd" clipRule="evenodd" />
                  <path d="M5.525 6.59169 7.98333 8.39997C8.61667 6.84169 10.1667 5.74169 12 5.74169c1.075 0 2.05.38333 2.8083 1.01667l2.1-2.09167C15.6583 3.53333 13.9167 2.95 12 2.95c-3.13333 0-5.83333 1.76667-7.15833 4.175" fill="#F33A21" fillRule="evenodd" clipRule="evenodd" />
                  <path d="M4.2 12c0-.65.10833-1.2667.3-1.8417l-2.31666-1.7833C1.63334 9.53333 1.3 10.7333 1.3 12c0 1.25.325 2.4417.88334 3.6167l2.33333-1.7834C4.31667 13.2667 4.2 12.65 4.2 12" fill="#FABB04" fillRule="evenodd" clipRule="evenodd" />
                  <path d="M12 21.05c1.8667 0 3.5917-.6167 4.95-1.6667l-2.2917-2.2833c-.7.5167-1.6333.85-2.6583.85-1.9833 0-3.66667-1.35-4.26667-3.2167l-2.35 1.8334c1.35 2.65 4.09167 4.4833 7.21667 4.4833" fill="#149C59" fillRule="evenodd" clipRule="evenodd" />
               </svg>
               Google
            </button>
         </div>
      </div>
    </div>
  );
}
