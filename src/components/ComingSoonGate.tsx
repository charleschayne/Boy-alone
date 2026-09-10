'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ComingSoonGate = ({ children }: { children: React.ReactNode }) => {
    const isLocked = true;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    if (!isLocked) {
        return <>{children}</>;
    }

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
                    src="/assets/Shinning Collection 2 /SHININGFACESKATERTEEIMG_6799.JPEG"
                    alt="Boy Alone"
                    fill
                    className="object-cover object-center opacity-40 brightness-[0.3]"
                    quality={100}
                    priority
                />
            </div>

            <div className="relative z-10 flex max-h-screen w-full flex-col items-center overflow-y-auto px-6 py-10 text-center">
                <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <h1 className="mx-auto max-w-[18rem] text-2xl font-black uppercase leading-relaxed tracking-[0.18em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] md:max-w-lg md:text-5xl md:tracking-[0.25em]">
                        Join the Boy Alone Community
                    </h1>
                    <div className="mx-auto mb-10 mt-8 h-[1px] w-24 bg-white/20"></div>

                    {status === 'success' ? (
                        <p className="text-sm uppercase tracking-[0.3em] text-white">
                            You&apos;re in.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-5">
                            <input
                                type="text"
                                placeholder="NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="border border-white/20 bg-transparent px-4 py-3 text-xs uppercase tracking-[0.2em] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-white/20 bg-transparent px-4 py-3 text-xs uppercase tracking-[0.2em] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="PHONE"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="border border-white/20 bg-transparent px-4 py-3 text-xs uppercase tracking-[0.2em] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="mt-2 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-white/90 disabled:opacity-50"
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

                    <p className="mt-12 text-[10px] font-light uppercase tracking-[0.5em] text-white/40 md:text-xs">
                        Boy Alone &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonGate;
