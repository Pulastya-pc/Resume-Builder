"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = { mode: "login" | "signup" };

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const result = isSignup
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });

      if (result.error) {
        setMessage(result.error.message ?? (isSignup ? "Could not create your account." : "Could not sign in."));
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Could not connect to authentication. Check your database setup.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12 text-white">
      <section className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-7 shadow-2xl sm:p-9">
        <Link href="/" className="text-sm font-semibold text-red-400 hover:text-red-300">← Resume Builder</Link>
        <div className="mt-8 mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Your next step</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-400">
            {isSignup ? "Save your resume privately and access it across devices." : "Sign in to continue working on your saved resume."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {isSignup && (
            <label className="grid gap-2 text-sm font-medium text-neutral-200">
              Name
              <input required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-red-500" />
            </label>
          )}
          <label className="grid gap-2 text-sm font-medium text-neutral-200">
            Email
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-red-500" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-neutral-200">
            Password
            <input required type="password" minLength={8} autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-red-500" />
            {isSignup && <span className="text-xs font-normal text-neutral-500">Use at least 8 characters.</span>}
          </label>
          {message && <p role="alert" className="text-sm text-red-300">{message}</p>}
          <button disabled={busy} type="submit" className="mt-2 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-60">
            {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          {isSignup ? "Already have an account? " : "New to Resume Builder? "}
          <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-red-400 hover:text-red-300">
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
}
