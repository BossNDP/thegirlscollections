'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignIn, useUser } from '@clerk/nextjs';
import { Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ToastContainer';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const { isLoaded, signIn, setActive } = useSignIn() as any;
  const { user } = useUser();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const unauthorizedError = searchParams.get('error') === 'unauthorized';

  useEffect(() => {
    const hasAdminCookie = typeof document !== 'undefined' && document.cookie.includes('tgc_admin_session=true');
    const userEmail = (user?.primaryEmailAddress?.emailAddress || user?.emailAddresses[0]?.emailAddress || '').toLowerCase().trim();
    const allowlist = ['nagarjundp256@gmail.com', 'admin@tgc.in', 'nnvg2608@gmail.com', 'drftnclothing@gmail.com', 'chethansc47@gmail.com'];
    const isAllowed = Boolean(userEmail && allowlist.includes(userEmail)) || user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'staff' || hasAdminCookie;

    if (isAllowed) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    let clerkSuccess = false;
    if (isLoaded && signIn && setActive && email.includes('@')) {
      try {
        const result = (await signIn.create({
          identifier: email,
          password,
        })) as any;

        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          clerkSuccess = true;
        }
      } catch (err) {
        console.warn('Clerk login note:', err);
      }
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok || clerkSuccess) {
        document.cookie = 'tgc_admin_session=true; path=/; max-age=604800';
        addToast('Logged in successfully', 'success');
        router.push('/admin');
        router.refresh();
        return;
      }

      const data = await res.json();
      throw new Error(data.error || 'Failed to authenticate admin session');
    } catch (error: any) {
      console.error(error);
      const msg = error.message || 'Failed to login';
      setErrorMsg(msg);
      addToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDevBypass = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@tgc.in', password: 'dev' }),
      });
      document.cookie = 'tgc_admin_session=true; path=/; max-age=604800';
      addToast('Dev Admin session activated', 'success');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-[0.15em] text-white uppercase mb-2">
            THE GIRLS COLLECTIONS <span className="text-amber-400 font-light text-sm align-top">ADMIN</span>
          </h1>
          <p className="text-zinc-500 text-xs tracking-widest uppercase">Authorized Personnel Only</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            {unauthorizedError && (
              <div className="bg-zinc-950 border border-red-900/50 p-4 text-xs text-red-200 flex items-start gap-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                <div>
                  <span className="font-bold uppercase tracking-wider block mb-1">Access Denied</span>
                  <p>Your account does not have admin privileges. Sign in below to establish session.</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="bg-zinc-950 border border-red-900/50 p-4 text-xs text-red-200 flex items-start gap-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                <div>
                  <span className="font-bold uppercase tracking-wider block mb-1">Login Note</span>
                  {errorMsg}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                Username or Email Address
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-amber-400 transition-colors font-mono"
                placeholder="nnvg2608@gmail.com or admin@tgc.in"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-amber-400 transition-colors font-mono"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-zinc-200 text-black py-3.5 font-bold uppercase tracking-widest text-xs transition-colors rounded-lg disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <button
              type="button"
              onClick={handleQuickDevBypass}
              disabled={isLoading}
              className="w-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 py-3 font-bold uppercase tracking-wider text-xs transition-colors rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Quick Dev Access (1-Click Login)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">Loading auth screen...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
