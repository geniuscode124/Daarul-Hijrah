"use client";

import Link from "next/link";
import Image from "next/image";
import { SignupForm } from "@/components/forms/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Panel - Brand & Inspiration */}
      <div className="relative flex w-full flex-col justify-between bg-[#114232] p-8 text-white lg:w-[45%] lg:p-12 xl:p-16">
        {/* Background pattern could go here */}
        
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
           <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-[#C5A059]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
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
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#114232] bg-[#C5A059]/20 backdrop-blur-md text-white font-bold">
                      {String.fromCharCode(64 + i)}
                   </div>
                 ))}
              </div>
              <div>
                 <p className="font-bold text-white">2,000+ Students</p>
                 <p className="text-sm text-[#C5A059]">Trust Daarul-Hijrah</p>
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
            <SignupForm />
         </div>
      </div>
    </div>
  );
}
