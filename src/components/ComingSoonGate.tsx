'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { EARLY_ACCESS_STORAGE_KEY, isEarlyAccess } from '@/lib/earlyAccess';
import Image from 'next/image';
import { collections } from '@/data/products';

const subscribeToAccess = (callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
};

const ComingSoonGate = ({ children }: { children: React.ReactNode }) => {
    const savedAccess = useSyncExternalStore(subscribeToAccess, isEarlyAccess, () => false);
    const [unlocked, setUnlocked] = useState(false);
    const [memberMode, setMemberMode] = useState(false);
    const [code, setCode] = useState('');
    const [checkingCode, setCheckingCode] = useState(false);
    const [codeError, setCodeError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    if (unlocked || savedAccess) {
        return <>{children}</>;
    }

    const handleAccess = async (e: React.FormEvent) => {
        e.preventDefault();
        setCheckingCode(true);
        setCodeError('');
        try {
            const response = await fetch('/api/access-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code.trim() }),
            });
            if (!response.ok) {
                setCodeError(response.status === 401
                    ? 'Invalid access code. Try again.'
                    : 'Unable to verify your code. Please try again.');
                return;
            }
            try {
                window.localStorage.setItem(EARLY_ACCESS_STORAGE_KEY, 'granted');
            } catch {
                // Access still works when browser storage is unavailable.
            }
            setUnlocked(true);
        } catch {
            setCodeError('Unable to connect. Please try again.');
        } finally {
            setCheckingCode(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                }),
            });

            if (!res.ok) throw new Error('Failed to submit');

            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden font-shojumaru">
            <div className="absolute inset-0 z-0">
                <Image
                    src={collections[0].featuredImage}
                    alt="Boy Alone"
                    fill
                    className="object-cover object-center opacity-40 brightness-[0.3]"
                    quality={100}
                    priority
                />
            </div>

            <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto px-6 py-10 text-center">
                <div className="my-auto w-full max-w-lg shrink-0 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <h1 className="mx-auto w-full text-[clamp(12px,3.7vw,20px)] font-black uppercase leading-relaxed tracking-[0.18em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] md:text-3xl md:tracking-[0.2em]">
                        <span className="block whitespace-nowrap">Join the Boy Alone</span>
                        <span className="block">Community</span>
                    </h1>
                    <div className="mx-auto mb-6 mt-5 h-[1px] w-24 bg-white/20"></div>

                    {memberMode ? (
                        <form onSubmit={handleAccess} className="mx-auto flex w-full max-w-xs flex-col gap-3">
                            <label htmlFor="member-code" className="text-[10px] uppercase tracking-widest text-white/70">Member access code</label>
                            <input
                                id="member-code"
                                type="text"
                                value={code}
                                onChange={(e) => { setCode(e.target.value); setCodeError(''); }}
                                placeholder="ENTER YOUR CODE"
                                autoFocus
                                autoComplete="off"
                                spellCheck={false}
                                required
                                aria-invalid={!!codeError}
                                aria-describedby={codeError ? 'code-error' : undefined}
                                className="border border-white/20 bg-transparent px-3 py-2.5 text-xs tracking-widest text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
                            />
                            <button type="submit" disabled={checkingCode || !code.trim()} className="bg-white px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-black hover:bg-white/90 disabled:opacity-50">
                                {checkingCode ? 'CHECKING...' : 'ENTER SITE'}
                            </button>
                            {codeError && <p id="code-error" role="alert" className="text-[10px] text-red-400">{codeError}</p>}
                        </form>
                    ) : status === 'success' ? (
                        <p className="text-sm uppercase tracking-[0.3em] text-white">
                            You&apos;re in.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xs flex-col gap-3">
                            <input
                                type="text"
                                placeholder="NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="border border-white/20 bg-transparent px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-white/20 bg-transparent px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="PHONE"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="border border-white/20 bg-transparent px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="mt-2 bg-white px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-white/90 disabled:opacity-50"
                            >
                                {status === 'submitting' ? 'JOINING...' : 'JOIN'}
                            </button>
                            {status === 'error' && (
                                <p className="text-[10px] uppercase tracking-wider text-red-400">
                                    Something went wrong. Try again.
                                </p>
                            )}
                        </form>
                    )}

                    <button
                        type="button"
                        onClick={() => { setMemberMode(!memberMode); setCodeError(''); }}
                        className="mt-5 py-2 text-[10px] tracking-wider text-white/70 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-white"
                    >
                        {memberMode ? 'Back to join' : 'Already a member?'}
                    </button>

                </div>
            </div>
            <p className="relative z-10 w-full shrink-0 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-center text-[10px] font-light uppercase tracking-[0.5em] text-white/40 md:text-xs">
                Boy Alone &copy; {new Date().getFullYear()}
            </p>
        </div>
    );
};

export default ComingSoonGate;
