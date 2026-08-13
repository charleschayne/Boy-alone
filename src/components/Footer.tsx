import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-6 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">

                {/* Logo/Brand */}
                <div className="mb-6 md:mb-0">
                    <Link href="/" className="text-lg font-bold tracking-[0.2em] uppercase">
                        Boy Alone
                    </Link>
                    <p className="text-[10px] text-gray-500 mt-2 tracking-wide">© 2026 Boy Alone. All rights reserved.</p>
                </div>

                {/* Links */}
                <div className="flex space-x-8 text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400">
                    <Link href="https://www.instagram.com/myre_kayy/" target="_blank" className="hover:text-white transition-colors">Instagram</Link>
                    <a href="tel:+13025686093" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>

            {/* Made by LaunchBox */}
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-900 flex items-center justify-center text-center">
                <Link href="https://www.launchbox.live/agency" target="_blank" className="text-[10px] tracking-[0.2em] uppercase text-gray-500 hover:text-white transition-colors">
                    Made by LaunchBox
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
