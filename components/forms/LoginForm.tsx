"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setPasswordStrength(score);
  };

  async function onSubmit(values: LoginFormValues) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        let errorMessage = "Invalid credentials";
        try {
          const data = await res.json();
          errorMessage = data.message || errorMessage;
        } catch {
          // JSON parsing failed, keep default errorMessage
        }
        throw new Error(errorMessage);
      }
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-semibold">Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="name@example.com" 
                    className="h-11 pl-10 bg-muted/30" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-foreground font-semibold">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm font-bold text-[#C5A059] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <FormControl>
                <div className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 pl-10 bg-muted/30 pr-10"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        calculateStrength(e.target.value);
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {field.value.length > 0 && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((index) => {
                          const getStrengthColor = (score: number) => {
                            if (score === 1) return "bg-red-500";
                            if (score === 2) return "bg-orange-500";
                            if (score === 3) return "bg-amber-500";
                            if (score === 4) return "bg-emerald-500";
                            return "bg-muted";
                          };

                          return (
                            <div
                              key={index}
                              className={cn(
                                "h-1.5 rounded-full transition-colors",
                                index <= passwordStrength 
                                  ? getStrengthColor(passwordStrength) 
                                  : "bg-muted"
                              )}
                            />
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must contain at least 8 characters, one symbol, one number, and one capital letter.
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-12 w-full bg-primary font-semibold hover:bg-primary/90" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Log In
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
