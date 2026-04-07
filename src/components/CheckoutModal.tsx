'use client';

import { Product, ProductColor } from '@/data/products';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Initialize Stripe outside of the component to avoid re-creation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    selectedColor: ProductColor;
    selectedSize: string;
    quantity: number;
}

const CheckoutForm = ({ product, quantity, onSuccess }: { product: Product, quantity: number, onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsLoading(false);
        } else {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500">PAYMENT INFORMATION</h2>
                <PaymentElement options={{ layout: 'tabs' }} />
                {errorMessage && <div className="text-red-500 text-[10px] uppercase tracking-widest">{errorMessage}</div>}
            </div>

            <div className="pt-12">
                <button 
                    disabled={!stripe || isLoading}
                    type="submit"
                    className="w-full bg-white text-black py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-colors shadow-2xl disabled:opacity-50"
                >
                    {isLoading ? 'PROCESSING...' : 'BUY NOW'}
                </button>
            </div>
        </form>
    );
};

const CheckoutModal = ({ isOpen, onClose, product, selectedColor, selectedSize, quantity }: CheckoutModalProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    
    useEffect(() => {
        if (isOpen) {
            const priceValue = parseInt(product.price.replace('$', ''));
            const amount = priceValue * quantity * 100; // Stripe expects cents

            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        }
    }, [isOpen, product.price, quantity]);

    if (!isOpen) return null;

    const priceValue = parseInt(product.price.replace('$', ''));
    const total = priceValue * quantity;

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
                <div className="text-center space-y-6 max-w-md px-6">
                    <h2 className="text-4xl font-bold uppercase tracking-[0.3em] text-white italic">THANK YOU</h2>
                    <p className="text-xs uppercase tracking-widest text-gray-400 leading-loose">
                        Your order has been placed successfully. A confirmation email will be sent shortly.
                    </p>
                    <div className="pt-8">
                         <div className="w-12 h-px bg-white mx-auto animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-black text-white animate-in slide-in-from-bottom duration-500 overflow-y-auto md:overflow-hidden">
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-8 right-8 z-50 p-2 hover:rotate-90 transition-transform duration-300"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Left Side: Summary */}
            <div className="w-full md:w-1/2 h-full bg-neutral-900/50 p-12 flex flex-col justify-center border-r border-white/10">
                <div className="max-w-md mx-auto w-full space-y-12 py-12">
                     <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500">ORDER SUMMARY</h2>
                     
                     <div className="flex gap-8 items-start">
                        <div className="relative w-32 aspect-[3/4] bg-neutral-800 overflow-hidden shadow-2xl">
                            <Image 
                                src={product.images[0]} 
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold uppercase tracking-widest italic">{product.name}</h3>
                            <div className="space-y-1 text-[10px] uppercase tracking-widest text-gray-400">
                                <p>COLOR: {selectedColor.name}</p>
                                <p>SIZE: {selectedSize || 'Standard'}</p>
                                <p>QTY: {quantity}</p>
                            </div>
                        </div>
                     </div>

                     <div className="pt-12 border-t border-white/10 space-y-4">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                            <span>Subtotal</span>
                            <span>{product.price} x {quantity}</span>
                        </div>
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold uppercase tracking-[0.2em] pt-4">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                     </div>
                </div>
            </div>

            {/* Right Side: Shipping & Stripe Form */}
            <div className="w-full md:w-1/2 h-full bg-black p-12 flex flex-col justify-center overflow-y-auto">
                <div className="max-w-md mx-auto w-full space-y-12 py-12">
                    {/* Shipping Section */}
                    <div className="space-y-8">
                        <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500">SHIPPING INFORMATION</h2>
                        <div className="space-y-6">
                            <input required className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="FULL NAME" />
                            <input required className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="EMAIL ADDRESS" />
                            <input required className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="STREET ADDRESS" />
                            <div className="grid grid-cols-2 gap-8">
                                <input required className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="CITY" />
                                <input required className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="ZIP CODE" />
                            </div>
                        </div>
                    </div>

                    {/* Stripe Payment Section */}
                    {clientSecret ? (
                        <Elements stripe={stripePromise} options={{ 
                            clientSecret,
                            appearance: {
                                theme: 'night',
                                variables: {
                                    colorPrimary: '#ffffff',
                                    colorBackground: '#000000',
                                    colorText: '#ffffff',
                                    colorDanger: '#df1b41',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    spacingUnit: '4px',
                                    borderRadius: '0px',
                                },
                            }
                        }}>
                            <CheckoutForm product={product} quantity={quantity} onSuccess={() => setIsSubmitted(true)} />
                        </Elements>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-4 pt-12">
                            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">INITIALIZING SECURE PAYMENT...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
