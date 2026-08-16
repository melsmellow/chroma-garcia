"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="font-mono-label text-[11px] uppercase tracking-wider text-ink-soft"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-white/30 focus:border-coral disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="font-mono-label text-[11px] uppercase tracking-wider text-ink-soft"
          >
            Password
          </label>

          <a
            href="/forgot-password"
            className="text-xs text-coral transition-opacity hover:opacity-80"
          >
            Forgot password?
          </a>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          disabled={isLoading}
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-coral disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full border border-coral bg-coral px-4 py-3 font-mono-label text-[11px] uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
