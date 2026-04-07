'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function SuccessPage() {
  // Clear cart or other state here if needed
  
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-12 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-[0.3em] uppercase italic bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
            Confirmed
          </h1>
          <div className="h-px w-24 bg-white/20 mx-auto" />
        </div>

        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">Order Successful</p>
          <p className="text-sm font-light leading-loose text-gray-300">
            Thank you for choosing <span className="font-bold text-white tracking-widest">BOY ALONE</span>. 
            Your order has been secured and our team is preparing it for shipment. 
            A notification has been sent to your primary contact.
          </p>
        </div>

        <div className="pt-12">
          <Link 
            href="/"
            className="group relative inline-block px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 hover:tracking-[0.6em]"
          >
            <span className="relative z-10">Return to Store</span>
            <div className="absolute inset-0 bg-neutral-200 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </Link>
        </div>

        <div className="pt-24 space-y-4 opacity-30">
            <p className="text-[8px] uppercase tracking-[1em]">London &bull; Lagos &bull; New York</p>
        </div>
      </div>
    </main>
  );
}
