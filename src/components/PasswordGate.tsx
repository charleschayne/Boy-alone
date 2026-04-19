'use client';

import React from 'react';
import Image from 'next/image';

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
    // Lock is absolute now as per request
    const isLocked = true;

    if (!isLocked) {
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
                <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[0.3em] text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        THIS DROP IS GONE
                    </h1>
                    <div className="w-24 h-[1px] bg-white/20 mx-auto mt-8 mb-12"></div>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-light">
                        Boy Alone &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordGate;

