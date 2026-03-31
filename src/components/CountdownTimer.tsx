'use client';

import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        // Target Date: April 18, 2026 00:00:00
        const targetDate = new Date('2026-04-18T00:00:00').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="text-3xl md:text-6xl font-black tracking-tighter tabular-nums text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {value.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 font-bold mt-1">
                {label}
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center py-8 animate-in fade-in zoom-in duration-1000">
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="text-2xl md:text-5xl font-light text-white/30 self-start mt-1 md:mt-2">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="text-2xl md:text-5xl font-light text-white/30 self-start mt-1 md:mt-2">:</div>
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <div className="text-2xl md:text-5xl font-light text-white/30 self-start mt-1 md:mt-2">:</div>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
};

export default CountdownTimer;
