"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { GlassCard } from "@/components/glass-card";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(loginValue, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Aura Workspace
          </h1>
          <p className="mt-2 text-[#A1A1AA]">
            Sign in with your email or employee number
          </p>
        </div>

        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login"
                className="mb-2 block text-sm font-medium text-[#A1A1AA]"
              >
                Email or Employee Number
              </label>
              <input
                id="login"
                type="text"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                placeholder="test@aura.local or EMP001"
                className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#0A0A0A] px-4 py-3 text-white placeholder-[#A1A1AA] outline-none focus:border-[#F2A900] focus:ring-1 focus:ring-[#F2A900]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#A1A1AA]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#0A0A0A] px-4 py-3 text-white placeholder-[#A1A1AA] outline-none focus:border-[#F2A900] focus:ring-1 focus:ring-[#F2A900]"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-[#EF4444]/10 px-4 py-3 text-sm text-[#EF4444]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#F2A900] px-4 py-3 font-semibold text-[#0A0A0A] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
