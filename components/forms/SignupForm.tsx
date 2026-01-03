"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2, User, Mail, Lock, ArrowRight } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  terms: z.literal(true, {
    error: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false as unknown as true,
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

  async function onSubmit(values: SignupFormValues) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           firstName: values.firstName,
           lastName: values.lastName,
           email: values.email,
           password: values.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
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
    <div className="w-full max-w-lg space-y-8">
      <div className="flex justify-end text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/login" className="ml-1 font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Create your account
        </h1>
        <p className="text-lg text-muted-foreground">
          Start your journey with us today.
        </p>
      </div>

      <Badge variant="success" className="px-3 py-1 text-sm font-medium">
        <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
        Student Account
      </Badge>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Yusuf" 
                    className="h-11 bg-muted/30" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ali" 
                    className="h-11 bg-muted/30" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              <FormLabel className="text-foreground font-semibold">Password</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
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

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold underline hover:bg-black/5 hover:text-black hover:no-underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold underline hover:bg-black/5 hover:text-black hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="h-12 w-full bg-primary font-semibold hover:bg-primary/90" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-12 w-full bg-background"
          onClick={() => {}}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="mr-2 h-4 w-4"
          />
          Google
        </Button>
      </form>
    </Form>
  </div>
);
}
