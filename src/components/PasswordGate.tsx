'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
    const isLocked = true;

    if (!isLocked) {
        return <>{children}</>;
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone }),
            });

            if (!res.ok) throw new Error('Failed to submit');

            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden font-chelsea">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero.png"
                    alt="Boy Alone Drop"
                    fill
                    className="object-cover object-center opacity-40 brightness-[0.3]"
                    quality={100}
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-6 max-w-lg w-full text-center">
                <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[0.3em] text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        JOIN THE WAITLIST
                    </h1>
                    <div className="w-24 h-[1px] bg-white/20 mx-auto mt-8 mb-10"></div>

                    {status === 'success' ? (
                        <p className="text-white text-sm uppercase tracking-[0.3em]">
                            You're on the list.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm mx-auto">
                            <input
                                type="text"
                                placeholder="NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-transparent border border-white/20 text-white text-xs uppercase tracking-[0.2em] px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                            />
                            <input
                                type="email"
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-transparent border border-white/20 text-white text-xs uppercase tracking-[0.2em] px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                            />
                            <input
                                type="tel"
                                placeholder="PHONE"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="bg-transparent border border-white/20 text-white text-xs uppercase tracking-[0.2em] px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="bg-white text-black text-xs font-bold uppercase tracking-[0.3em] px-4 py-3 mt-2 hover:bg-white/90 disabled:opacity-50 transition-colors"
                            >
                                {status === 'submitting' ? 'JOINING...' : 'JOIN WAITLIST'}
                            </button>
                            {status === 'error' && (
                                <p className="text-red-400 text-[10px] uppercase tracking-wider">
                                    Something went wrong. Try again.
                                </p>
                            )}
                        </form>
                    )}

                    <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-light mt-12">
                        Boy Alone &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordGate;
