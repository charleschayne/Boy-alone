import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-12 px-6 border-t border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">

                {/* Logo/Brand */}
                <div className="mb-6 md:mb-0">
                    <Link href="/" className="text-lg font-bold tracking-[0.2em] uppercase">
                        Boy Alone
                    </Link>
                    <p className="text-[10px] text-gray-400 mt-2 tracking-wide">© 2026 Boy Alone. All rights reserved.</p>
                </div>

                {/* Links */}
                <div className="flex space-x-8 text-[10px] font-medium tracking-[0.2em] uppercase text-gray-600">
                    <Link href="#" className="hover:text-black transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-black transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-black transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
