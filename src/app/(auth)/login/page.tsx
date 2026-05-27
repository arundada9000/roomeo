"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, MapPin, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) throw error;
      router.push("/explore");
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
      <motion.div
        className="w-full max-w-[420px]"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Back to Home */}
        <motion.div custom={0} variants={fadeUp} className="mb-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </motion.div>

        {/* Mobile logo (hidden on desktop since layout shows it) */}
        <motion.div custom={1} variants={fadeUp} className="mb-10 flex flex-col items-center justify-center gap-4 lg:hidden">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-r from-primary/50 to-blue-400/50 blur-lg opacity-75 transition duration-500 group-hover:opacity-100" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] bg-white shadow-xl overflow-hidden border border-border/50">
              <Image src="/logo.png" alt="Roomeo" width={64} height={64} className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-foreground drop-shadow-sm">ROOMEO</span>
        </motion.div>

        {/* Header */}
        <motion.div custom={2} variants={fadeUp} className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Sign in to continue your room search
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm font-medium text-destructive"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form custom={3} variants={fadeUp} onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="alex@luxe.com"
                className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 pl-12 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                id="login-email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <button type="button" className="text-xs font-bold text-primary hover:underline underline-offset-4">
                FORGOT?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 pl-12 pr-12 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                id="login-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
            id="login-submit"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div custom={4} variants={fadeUp} className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </motion.div>

        {/* Social Buttons */}
        <motion.div custom={5} variants={fadeUp} className="mt-6 grid grid-cols-2 gap-3">
          <button className="flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-border/60 bg-card text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary/50 hover:border-border hover:shadow-sm">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-border/60 bg-card text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary/50 hover:border-border hover:shadow-sm">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple
          </button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p custom={6} variants={fadeUp} className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-primary hover:underline underline-offset-4 transition-colors">
            Create Account
          </Link>
        </motion.p>

        {/* Terms */}
        <motion.p custom={7} variants={fadeUp} className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/70">
          By accessing Roomeo, you agree to our{" "}
          <span className="font-semibold text-primary/80 hover:underline">Terms of Service</span>{" "}
          and{" "}
          <span className="font-semibold text-primary/80 hover:underline">Privacy Policy</span>.
        </motion.p>
      </motion.div>
    </div>
  );
}
