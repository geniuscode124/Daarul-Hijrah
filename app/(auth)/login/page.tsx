"use client";

import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F4F9F6] p-4 text-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23114232' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}
      ></div>

      <div className="relative z-10 w-full max-w-[480px]">
         
         {/* Logo Section */}
         <div className="mb-8 flex flex-col items-center justify-center">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-white p-3 shadow-sm">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    <Image 
                        src="/logo.png" 
                        alt="Daarul-Hijrah Logo" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
            <h1 className="text-center font-serif text-3xl font-bold text-[#0F3D2E]">Welcome Back</h1>
            <p className="mt-2 text-center text-sm text-gray-500">Log in to your Daarul-Hijrah account</p>
         </div>

         {/* Login Card */}
         <div className="rounded-2xl bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:p-10">
            <LoginForm />

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
               <div className="h-px flex-1 bg-gray-200"></div>
               <span className="text-xs font-medium text-gray-400">Or continue with</span>
               <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Google Button */}
            <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
               Sign in with Google
            </button>
         </div>

         {/* Footer Links */}
         <div className="mt-8 text-center">
             <p className="text-sm text-gray-500">
                Don't have an account? <Link href="/signup" className="font-bold text-[#0F3D2E] hover:underline">Sign Up</Link>
             </p>
         </div>

         <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">
               &copy; {new Date().getFullYear()} Daarul-Hijrah. All rights reserved.
            </p>
         </div>

      </div>
    </div>
  );
}
