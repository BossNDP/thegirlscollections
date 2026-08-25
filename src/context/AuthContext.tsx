'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '@/components/ToastContainer';
import { useSignIn, useClerk, useAuth as useClerkAuth } from '@clerk/nextjs';
import { X, Loader2, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  phone: string | null;
  phoneVerified: boolean;
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  notificationsOptIn: boolean;
  termsAcceptedAt: string | null;
  authProvider: 'phone' | 'google';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  openAuthModal: (mode?: 'phone' | 'google') => void;
  closeAuthModal: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Web Push Subscription Helper
export async function subscribeToWebPush(addToast: (msg: string, type: 'success' | 'error') => void) {
  try {
    if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;
    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    const rawKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!rawKey) {
      throw new Error('VAPID public key not configured');
    }
    const { urlBase64ToUint8Array } = await import('@/lib/vapid');
    const applicationServerKey = urlBase64ToUint8Array(rawKey);

    const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
    const res = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.toJSON().keys?.p256dh, auth: subscription.toJSON().keys?.auth },
        productId: null,
      }),
    });
    if (!res.ok) throw new Error('Subscription save failed');

    localStorage.setItem('push_alerts_subscribed', 'true');
    window.dispatchEvent(new Event('push-subscription-changed'));

    addToast('Successfully subscribed to notifications!', 'success');
  } catch (err) {
    console.error('Auto push subscription failed:', err);
  }
}

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const { addToast } = useToast();
  const { signOut } = useClerk();
  const { signIn, isLoaded: clerkSignInLoaded } = useSignIn();
  const { isSignedIn: clerkIsSignedIn, isLoaded: clerkAuthLoaded } = useClerkAuth();

  // ── Core session state ──────────────────────────────────────────
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ── Modal state ─────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'phone' | 'google'>('phone');

  // ── Verification / profile-completion state ──────────────────────
  const [isVerifying, setIsVerifying] = useState(false);
  const [profileStep, setProfileStep] = useState(false); // true = new user, show name form
  const [tempToken, setTempToken] = useState<string | null>(null);

  // ── Profile form state (new-user step) ───────────────────────────
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notificationsOptIn, setNotificationsOptIn] = useState(true);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  // ── Fetch session on mount ───────────────────────────────────────
  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Failed to fetch auth session:', err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    setMounted(true);
    refreshUser().then(() => {
      // In-tab flow: phone-callback page stashes tempToken here for new users
      const pendingToken = sessionStorage.getItem('pending_new_user_temp_token');
      if (pendingToken) {
        sessionStorage.removeItem('pending_new_user_temp_token');
        setTempToken(pendingToken);
        setProfileStep(true);
        setModalOpen(true);
        setModalMode('phone');
      }
    });
  }, []);

  // ── Detect Clerk Google session and sync with custom auth ────────
  useEffect(() => {
    if (clerkAuthLoaded && clerkIsSignedIn && !user && isLoaded) {
      // Clerk has a session (e.g. after Google OAuth redirect) but our
      // custom auth hasn't picked it up yet. Trigger a sync.
      refreshUser();
    }
  }, [clerkAuthLoaded, clerkIsSignedIn, user, isLoaded]);

  // ── Heartbeat (active users) ─────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    fetch('/api/auth/heartbeat', { method: 'POST' }).catch(() => {});
    const interval = setInterval(() => {
      fetch('/api/auth/heartbeat', { method: 'POST' }).catch(() => {});
    }, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  // ── Lock scroll when modal open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // ── Modal controls ───────────────────────────────────────────────
  const openAuthModal = (mode: 'phone' | 'google' = 'phone') => {
    setModalMode(mode);
    setIsVerifying(false);
    setProfileStep(false);
    setTempToken(null);
    setProfileFirstName('');
    setProfileLastName('');
    setProfileEmail('');
    setTermsAccepted(false);
    setNotificationsOptIn(true);
    setIsActionInProgress(false);
    setModalOpen(true);
  };

  const closeAuthModal = () => setModalOpen(false);

  // ── Logout ───────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await signOut();
      setUser(null);
      addToast('Logged out successfully', 'success');
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
      addToast('Failed to logout cleanly', 'error');
    }
  };

  // ── Google Login ─────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    if (isActionInProgress) return;

    // If Clerk already has a session (e.g. user already signed in via Google
    // but custom auth didn't sync), just sync and close the modal.
    if (clerkAuthLoaded && clerkIsSignedIn) {
      setIsActionInProgress(true);
      try {
        await refreshUser();
        closeAuthModal();
        addToast('Welcome back! 👋', 'success');
      } catch (err) {
        console.error('Session sync failed:', err);
        addToast('Failed to sync your session. Please try again.', 'error');
      } finally {
        setIsActionInProgress(false);
      }
      return;
    }

    if (!clerkSignInLoaded || !signIn) {
      addToast('Authentication service is loading, please try again.', 'error');
      return;
    }
    setIsActionInProgress(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: window.location.origin,
      });
    } catch (err: any) {
      // Handle "session_exists" — Clerk already has a session, just sync
      const code = err?.errors?.[0]?.code || err?.code;
      if (code === 'session_exists') {
        try {
          await refreshUser();
          closeAuthModal();
          addToast('Welcome back! 👋', 'success');
        } catch (syncErr) {
          console.error('Session sync after session_exists failed:', syncErr);
        }
      } else {
        console.error('Google OAuth direct trigger failed:', err);
        addToast('Failed to start Google Sign-In', 'error');
      }
      setIsActionInProgress(false);
    }
  };

  // ── Phone OTP — open phone.email popup ───────────────────────────
  const startPhoneOTP = () => {
    if (isActionInProgress) return;
    setIsActionInProgress(true);
    const finalClientId = process.env.NEXT_PUBLIC_PHONE_EMAIL_CLIENT_ID || '17565400827940866842';
    // Use the canonical app URL (without www) to match the phone.email whitelist.
    // Falls back to window.location.origin for local development.
    const appBase = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const redirectUrl = `${appBase}/phone-callback`;
    const authUrl =
      `https://auth.phone.email/log-in` +
      `?client_id=${finalClientId}` +
      `&redirect_url=${encodeURIComponent(redirectUrl)}`;

    const w = 500, h = 600;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    window.open(authUrl, 'phone_email_popup', `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`);

    // Auto unlock after 3 seconds in case window was blocked
    setTimeout(() => {
      setIsActionInProgress(false);
    }, 3000);
  };

  // ── Listen for postMessage from phone-callback popup ─────────────
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'PHONE_EMAIL_VERIFIED') return;

      const token = event.data.accessToken as string;

      // Make sure the modal is visible for loading + profile step feedback
      setModalOpen(true);
      setModalMode('phone');
      setProfileStep(false);
      setIsVerifying(true);

      try {
        const res = await fetch('/api/auth/verify-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: token }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          if (data.isNewUser) {
            // New user → show profile completion form
            setTempToken(data.tempToken);
            setProfileStep(true);
          } else {
            // Returning user → log in immediately, no extra steps
            setUser(data.user);
            addToast('Welcome back! 👋', 'success');
            if (data.user?.notificationsOptIn) subscribeToWebPush(addToast);
            closeAuthModal();
          }
        } else {
          addToast(data.error || 'Phone verification failed. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Verification error:', err);
        addToast('Something went wrong during verification.', 'error');
      } finally {
        setIsVerifying(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addToast]);

  // ── Profile form submit ──────────────────────────────────────────
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${profileFirstName.trim()} ${profileLastName.trim()}`.trim();
    if (fullName.length < 2) {
      addToast('Please enter your first name', 'error');
      return;
    }
    if (!termsAccepted) {
      addToast('Please accept the Terms & Conditions to continue', 'error');
      return;
    }

    const tokenToUse = tempToken || sessionStorage.getItem('pending_new_user_temp_token');

    setIsSubmittingProfile(true);
    try {
      if (tokenToUse || !user) {
        // Phone signup registration flow
        const res = await fetch('/api/auth/register-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email: profileEmail.trim() || undefined,
            tempToken: tokenToUse,
            notificationsOptIn,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          sessionStorage.removeItem('pending_new_user_temp_token');
          setTempToken(null);
          setUser(data.user);
          addToast('Welcome to DRFTN! 🎉', 'success');
          if (data.triggerPush) subscribeToWebPush(addToast);
          closeAuthModal();
        } else {
          addToast(data.error || 'Failed to save profile. Please try again.', 'error');
        }
      } else {
        // Existing user (e.g. Google sign-in) updating profile
        const res = await fetch('/api/auth/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
          addToast('Profile updated! 🎉', 'success');
          closeAuthModal();
        } else {
          addToast(data.error || 'Failed to update profile', 'error');
        }
      }
    } catch (err) {
      console.error('Profile submit error:', err);
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  // ── Escape key dismiss ───────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen && !isVerifying && !profileStep) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, isVerifying, profileStep]);

  return (
    <AuthContext.Provider value={{ user, isSignedIn: !!user, isLoaded, openAuthModal, closeAuthModal, logout, refreshUser }}>
      {children}

      {/* ── Auth Modal Portal ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => { if (!isVerifying && !profileStep) closeAuthModal(); }}
              style={{ zIndex: 99999 }}
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[420px] bg-ivory border border-zariGold/40 p-6 md:p-8 flex flex-col items-center gap-6 shadow-[0_16px_48px_rgba(28,31,59,0.25)] rounded-t-[32px] md:rounded-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Close button — hidden while verifying */}
                {!isVerifying && (
                  <button
                    onClick={closeAuthModal}
                    className="absolute top-4 right-4 text-inkNavy/50 hover:text-zariGold transition-colors w-9 h-9 flex items-center justify-center cursor-pointer z-50 rounded-full hover:bg-zariGold/10"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                {/* Logo & Brand Header */}
                <div className="flex flex-col items-center text-center pt-2">
                  <span className="text-[10px] font-serif font-bold text-zariGold tracking-[0.25em] uppercase mb-1">
                    THE GIRLS COLLECTION
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-inkNavy">
                    Welcome to Luxury
                  </h2>
                </div>

                {/* ── VERIFYING STATE ── */}
                {isVerifying && (
                  <div className="flex flex-col items-center gap-4 py-8 w-full">
                    <Loader2 className="w-10 h-10 text-zariGold animate-spin" />
                    <p className="text-xs font-serif font-bold tracking-widest text-inkNavy uppercase">
                      Verifying your credentials…
                    </p>
                  </div>
                )}

                {/* ── PROFILE COMPLETION STEP (new user) ── */}
                {!isVerifying && profileStep && (
                  <form onSubmit={handleProfileSubmit} className="w-full space-y-4">
                    <div className="text-center space-y-1 pb-2">
                      <h3 className="text-sm font-serif font-bold uppercase text-inkNavy tracking-widest">
                        Complete Your Profile
                      </h3>
                      <p className="text-xs text-inkNavy/70 font-sans leading-relaxed">
                        Provide your details to complete your luxury profile.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans uppercase tracking-wider text-inkNavy/70 font-bold block">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          autoFocus
                          placeholder="First"
                          value={profileFirstName}
                          onChange={(e) => setProfileFirstName(e.target.value)}
                          className="w-full bg-white border border-zariGold/30 px-3 py-3 text-xs text-inkNavy focus:outline-none focus:border-zariGold font-sans rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans uppercase tracking-wider text-inkNavy/70 font-bold block">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Last"
                          value={profileLastName}
                          onChange={(e) => setProfileLastName(e.target.value)}
                          className="w-full bg-white border border-zariGold/30 px-3 py-3 text-xs text-inkNavy focus:outline-none focus:border-zariGold font-sans rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-sans uppercase tracking-wider text-inkNavy/70 font-bold block">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. you@gmail.com"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full bg-white border border-zariGold/30 px-3 py-3 text-xs text-inkNavy focus:outline-none focus:border-zariGold font-sans rounded-lg"
                      />
                    </div>

                    <div className="space-y-3 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="mt-0.5 accent-zariGold shrink-0"
                        />
                        <span className="text-[11px] text-inkNavy/70 font-sans leading-relaxed">
                          I accept the{' '}
                          <a href="/policies/terms-and-conditions" target="_blank" className="text-zariGold underline">
                            Terms &amp; Conditions
                          </a>{' '}
                          and{' '}
                          <a href="/policies/privacy-policy" target="_blank" className="text-zariGold underline">
                            Privacy Policy
                          </a>{' '}
                          *
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingProfile}
                      className="w-full bg-zariGold hover:bg-zariGoldLight text-inkNavy py-3.5 font-bold uppercase tracking-widest text-xs transition-colors rounded-lg flex items-center justify-center gap-2 mt-2 shadow-md cursor-pointer"
                    >
                      {isSubmittingProfile ? 'Saving…' : 'Complete Setup →'}
                    </button>
                  </form>
                )}

                {/* ── UNIFIED SINGLE SIGN-IN SELECTION STEP ── */}
                {!isVerifying && !profileStep && (
                  <div className="w-full space-y-5">
                    <div className="text-center space-y-1">
                      <h3 className="text-sm font-serif font-bold uppercase text-inkNavy tracking-widest">
                        Sign In / Register
                      </h3>
                      <p className="text-xs text-inkNavy/70 font-sans leading-relaxed">
                        Access your order history, wishlist, and exclusive drops.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      <button
                        onClick={startPhoneOTP}
                        disabled={isActionInProgress || isVerifying}
                        className="w-full bg-inkNavy hover:bg-inkNavy/90 text-ivory py-3.5 font-sans font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer rounded-xl border border-inkNavy shadow-md disabled:opacity-50"
                      >
                        <Smartphone className="w-4 h-4 text-zariGold" />
                        {isActionInProgress ? 'Opening Secure Portal...' : 'Continue with Phone'}
                      </button>

                      <div className="relative text-center my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-zariGold/20" />
                        </div>
                        <span className="relative bg-ivory px-3 text-[10px] uppercase tracking-widest font-sans text-inkNavy/50">
                          Or
                        </span>
                      </div>

                      <button
                        onClick={handleGoogleLogin}
                        disabled={isActionInProgress || isVerifying}
                        className="w-full bg-white hover:bg-zariGold/10 text-inkNavy border border-zariGold/40 py-3.5 font-sans font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2.5 cursor-pointer rounded-xl shadow-xs disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        {isActionInProgress ? 'Redirecting to Google...' : 'Continue with Google'}
                      </button>
                    </div>

                    <p className="text-center text-[10px] text-inkNavy/60 font-sans leading-relaxed pt-1">
                      By continuing you agree to our{' '}
                      <a href="/policies/terms-and-conditions" target="_blank" className="text-zariGold underline font-medium">
                        Terms
                      </a>{' '}
                      &amp;{' '}
                      <a href="/policies/privacy-policy" target="_blank" className="text-zariGold underline font-medium">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </AuthContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthSession must be used within an AuthSessionProvider');
  }
  return context;
}
