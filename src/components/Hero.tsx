'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Lightning from './Lightning';

const Hero = () => {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
    const [typedText, setTypedText] = useState('');

    // The story content for the jacket
    const jacketStory = "Hand-distressed 14oz Japanese selvedge denim. Each abrasion is executed by hand in our Okayama workshop. Finished with custom hardware and a vintage wash process that takes 4 days to complete.";

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
        <section className="relative w-full h-[55vh] md:h-screen overflow-hidden font-mono text-white bg-white" onClick={() => setActiveHotspot(null)}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero-new.png"
                    alt="Boy Alone Hero"
                    fill
                    className="object-contain object-center md:object-cover md:object-center"
                    quality={100}
                    priority
                />
            </div>

            {/* Lightning Effect Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-80">
                <Lightning
                    hue={260}
                    xOffset={0}
                    speed={1}
                    intensity={1}
                    size={1}
                />
            </div>

            {/* Main Header Text */}
            <div className="absolute top-[18%] md:top-[20%] left-0 right-0 text-center z-20 px-4 pointer-events-none">
                <h1 className="text-sm md:text-xl font-bold uppercase tracking-[0.3em] text-black">
                    It's you against the world
                </h1>
            </div>

            {/* Hotspots - Simulated Interactivity */}

            {/* Hat Hotspot (Top) */}
            <div className="absolute top-[35%] md:top-[33%] left-1/2 transform -translate-x-1/2 z-20" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => handleHotspotClick('hat')}
                    className={`w-8 h-8 md:w-10 md:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer ${activeHotspot === 'hat' ? 'scale-110' : ''}`}
                >
                    <span className="text-lg font-bold transition-transform duration-300 transform" style={{ transform: activeHotspot === 'hat' ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
            </div>

            {/* Glassmorphism Card for Hat Story */}
            {activeHotspot === 'hat' && (
                <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-auto md:top-[28%] md:left-[52%] md:translate-x-0 w-[90vw] md:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm shadow-2xl z-30 text-xs md:text-sm leading-relaxed tracking-wide text-black animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4 duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-black/70">The Essential</h3>
                    <p className="font-light min-h-[80px]">{typedText}<span className="animate-pulse">|</span></p>
                </div>
            )}

            {/* Left Jacket Hotspot */}
            <div className="absolute top-[58%] md:top-[63%] left-[26%] md:left-[26%] transform -translate-x-1/2 z-20" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => handleHotspotClick('jacket-left')}
                    className={`w-8 h-8 md:w-10 md:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer ${activeHotspot === 'jacket-left' ? 'scale-110' : ''}`}
                >
                    <span className="text-lg font-bold transition-transform duration-300 transform" style={{ transform: activeHotspot === 'jacket-left' ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
            </div>

            {/* Glassmorphism Card for Left Jacket Story */}
            {activeHotspot === 'jacket-left' && (
                <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-[63%] md:left-[28%] md:translate-x-0 w-[90vw] md:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm shadow-2xl z-30 text-xs md:text-sm leading-relaxed tracking-wide text-black animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4 duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-black/70">The Shadow</h3>
                    <p className="font-light min-h-[100px]">{typedText}<span className="animate-pulse">|</span></p>
                </div>
            )}

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
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-[55%] md:left-[52%] md:translate-x-0 w-[90vw] md:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm shadow-2xl z-30 text-xs md:text-sm leading-relaxed tracking-wide text-black animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4 duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-black/70">The Craft</h3>
                    <p className="font-light min-h-[100px]">{typedText}<span className="animate-pulse">|</span></p>
                </div>
            )}

            {/* Right Jacket Hotspot */}
            <div className="absolute top-[58%] md:top-[63%] left-[78%] md:left-[78%] transform -translate-x-1/2 z-20" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => handleHotspotClick('jacket-right')}
                    className={`w-8 h-8 md:w-10 md:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer ${activeHotspot === 'jacket-right' ? 'scale-110' : ''}`}
                >
                    <span className="text-lg font-bold transition-transform duration-300 transform" style={{ transform: activeHotspot === 'jacket-right' ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
            </div>

            {/* Glassmorphism Card for Right Jacket Story */}
            {activeHotspot === 'jacket-right' && (
                <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-[72%] md:right-[5%] md:left-auto md:translate-x-0 w-[90vw] md:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm shadow-2xl z-30 text-xs md:text-sm leading-relaxed tracking-wide text-black animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-right-4 duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-black/70">The Vision</h3>
                    <p className="font-light min-h-[100px]">{typedText}<span className="animate-pulse">|</span></p>
                </div>
            )}



            {/* Content Layers */}



            {/* Bottom Visualizer / Ticker */}
            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 flex items-end justify-between px-2 md:px-4 pb-2 md:pb-4 opacity-50 pointer-events-none z-10">
                {/* Generate visualizer lines */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-[1px] bg-white transition-all duration-1000 ease-in-out"
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
