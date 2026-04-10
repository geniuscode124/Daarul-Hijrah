import Link from "next/link";
import Image from "next/image";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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
            <h1 className="text-center font-serif text-3xl font-bold text-[#0F3D2E]">Forgot Password</h1>
            <p className="mt-2 text-center text-sm text-gray-500">Enter your email and we'll send you a reset link</p>
         </div>

         {/* Forgot Password Card */}
         <div className="rounded-2xl bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:p-10">
            <ForgotPasswordForm />
         </div>

         {/* Footer Links */}
         <div className="mt-8 text-center">
             <p className="text-sm text-gray-500">
                Remember your password? <Link href="/login" className="font-bold text-[#0F3D2E] hover:underline">Log In</Link>
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
