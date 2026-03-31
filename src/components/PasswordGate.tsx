'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
    const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const CORRECT_PASSWORD = 'BOYALONE1234';

    useEffect(() => {
        const stored = localStorage.getItem('site_unlocked');
        if (stored === 'true') {
            setIsUnlocked(true);
        } else {
            setIsUnlocked(false);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.toUpperCase() === CORRECT_PASSWORD) {
            localStorage.setItem('site_unlocked', 'true');
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setPassword('');
            setTimeout(() => setError(false), 2000);
        }
    };

    if (isUnlocked === null) return null;

    if (isUnlocked) {
        return <>{children}</>;
    }

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
            <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl w-full text-center">
                <div className="mb-8 animate-in fade-in slide-in-from-top-12 duration-1000">
                    <CountdownTimer />
                </div>

                <div className="w-full max-w-sm mt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white mb-8 drop-shadow-2xl">
                        Early Access
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="ENTER PASSWORD"
                                className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500' : 'border-white/20 focus:border-white'} px-4 py-4 text-center text-white placeholder:text-white/20 uppercase tracking-[0.3em] text-sm outline-none transition-all duration-300`}
                                autoFocus
                            />
                            {error && (
                                <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-red-500 uppercase tracking-widest animate-pulse">
                                    Incorrect Password
                                </p>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default PasswordGate;
