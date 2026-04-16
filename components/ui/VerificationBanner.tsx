"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { ShieldAlert, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function VerificationBanner() {
  const { data: session, isPending } = authClient.useSession();
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cool down timer effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // If loading, or no session exists, or they ARE verified: hide the banner natively.
  if (isPending || !session || session.user.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    if (cooldown > 0) return;
    setIsResending(true);
    
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: session.user.email,
        callbackURL: "/", // Optional callback after verify
      });

      if (error) {
        toast.error(error.message || "Failed to resend email.");
      } else {
        toast.success("Verification email resent!");
        setCooldown(60); // Engage 60 second throttle
      }
    } catch (err: any) {
      toast.error("Internal Server Error.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full bg-[#0F3D2E] text-white px-4 py-3 shadow-md border-b-4 border-[#C5A059] z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-[#C5A059] flex-shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-sm">
            <span className="font-bold block sm:inline mb-1 sm:mb-0 mr-2">
              Data Protection Warning:
            </span>
            <span className="opacity-90">
              Your memorization streaks cannot sync securely until your email is verified. Check your inbox!
            </span>
          </div>
        </div>

        <Button 
          onClick={handleResend} 
          disabled={isResending || cooldown > 0}
          size="sm" 
          variant="outline"
          className="bg-transparent border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-all whitespace-nowrap min-w-[140px]"
        >
          {isResending ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
          ) : cooldown > 0 ? (
            `Wait ${cooldown}s`
          ) : (
            "Resend Email"
          )}
        </Button>
      </div>
    </div>
  );
}
