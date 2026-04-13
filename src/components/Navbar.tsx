'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface NavbarProps {
    isLight?: boolean;
}

const Navbar = ({ isLight = false }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 md:px-12 transition-all duration-300 ${isMenuOpen
                ? 'bg-black text-white'
                : isScrolled
                    ? 'bg-black/90 backdrop-blur-md shadow-sm border-b border-white/10 text-white'
                    : isLight 
                        ? 'bg-transparent text-black' 
                        : 'bg-transparent text-white'
                } text-[10px] md:text-xs tracking-widest uppercase font-light`}>

                {/* Left Links (Desktop) */}
                <div className="hidden md:flex justify-start">
                    <Link href="/collections/all" className="hover:opacity-70 transition-opacity">Collections</Link>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex justify-start z-50">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="focus:outline-none hover:opacity-70 transition-opacity"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Centered Logo */}
                <div className="flex justify-center px-4 z-50">
                    <Link href="/" className="font-light tracking-[0.2em] hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                        BOY ALONE
                    </Link>
                </div>

                {/* Right Actions (Desktop) */}
                <div className="hidden md:flex justify-end items-center">
                    <Link href="/about" className="hover:opacity-70 transition-opacity">Our Story</Link>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black z-40 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden flex flex-col items-center justify-center space-y-8 text-xl text-white`}>
                <Link href="/collections/all" className="hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Collections
                </Link>
                <Link href="/about" className="hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Our Story
                </Link>
            </div>
        </>
    );
};

export default Navbar;
