'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';

const Hero = () => {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
    const [typedText, setTypedText] = useState('');

    // The story content for the jacket
    const jacketStory = "This isn’t just denim; it’s you against everything. Every thread is intentional—the embroidery is stitched, built to last. The eye represents awareness: seeing and feeling everything. Tears first, then rage. Heavyweight denim carrying pain and power. This journey was never soft.";

    // The story content for the hat
    const hatStory = "Vintage 6-panel construction. Washed canvas for a lived-in feel from day one. Embroidered with our signature logo in a tonal thread.";

    // The story content for the left jacket
    const leftJacketStory = "The Shadow Varsity. Heavyweight wool body with full grain leather sleeves. The graphic embodies the silent scream of the void. A darkness that comforts.";

    // The story content for the right jacket
    const rightJacketStory = "'Girl Alone' chenille patches on premium melton wool. A shared narrative of power found in solitude.";

    useEffect(() => {
        let textToType = '';
        if (activeHotspot === 'jacket') {
            textToType = jacketStory;
        } else if (activeHotspot === 'hat') {
            textToType = hatStory;
        } else if (activeHotspot === 'jacket-left') {
            textToType = leftJacketStory;
        } else if (activeHotspot === 'jacket-right') {
            textToType = rightJacketStory;
        }

        if (textToType) {
            setTypedText('');
            let i = 0;
            const interval = setInterval(() => {
                setTypedText(textToType.slice(0, i + 1));
                i++;
                if (i > textToType.length) clearInterval(interval);
            }, 30); // Typing speed
            return () => clearInterval(interval);
        } else {
            setTypedText('');
        }
    }, [activeHotspot]);

    const handleHotspotClick = (hotspot: string) => {
        setActiveHotspot(activeHotspot === hotspot ? null : hotspot);
    };

    return (
        <section className="relative w-full h-screen overflow-hidden text-white bg-white" onClick={() => setActiveHotspot(null)}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero.png"
                    alt="Boy Alone Hero"
                    fill
                    className="object-cover object-center"
                    quality={100}
                    priority
                />
            </div>

            {/* Lightning Effect Overlay */}


            {/* Main Header Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8 pointer-events-none">
                <h1 className="text-[10px] md:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center max-w-full italic leading-loose animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    "It's you against the world"
                </h1>
            </div>

            {/* Hotspots - Simulated Interactivity */}

            {/* Center Jacket Hotspot */}
            <div className="absolute top-[53%] md:top-[55%] left-[48%] transform -translate-x-1/2 z-20" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => handleHotspotClick('jacket')}
                    className={`w-8 h-8 md:w-10 md:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer ${activeHotspot === 'jacket' ? 'scale-110' : ''}`}
                >
                    <span className="text-lg font-bold transition-transform duration-300 transform" style={{ transform: activeHotspot === 'jacket' ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
            </div>

            {/* Glassmorphism Card for Center Jacket Story */}
            {activeHotspot === 'jacket' && (
                <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-[55%] md:left-[52%] md:translate-x-0 w-[90vw] md:w-80 bg-black/40 backdrop-blur-md border border-white/20 p-6 rounded-sm shadow-2xl z-30 text-xs md:text-sm leading-relaxed tracking-wide text-white animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4 duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-white/70">The Craft</h3>
                    <p className="font-light min-h-[100px]">{typedText}<span className="animate-pulse">|</span></p>
                </div>
            )}



            {/* Content Layers */}



            {/* Bottom Visualizer / Ticker */}
            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 flex items-end justify-between px-2 md:px-4 pb-2 md:pb-4 opacity-50 pointer-events-none z-10 overflow-hidden">
                {/* Generate visualizer lines */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-[1px] bg-white transition-all duration-1000 ease-in-out shrink-0"
                        style={{
                            height: `${Math.random() * 40 + 10}%`,
                            opacity: Math.random() * 0.5 + 0.3
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
