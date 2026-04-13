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
import { motion, AnimatePresence } from 'motion/react';

// Initialize Stripe outside of the component to avoid re-creation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    selectedColor: ProductColor;
    selectedSize: string;
    quantity: number;
}

const CheckoutForm = ({ 
    product, 
    quantity, 
    shippingData,
    onSuccess,
    selectedColor,
    selectedSize
}: { 
    product: Product, 
    quantity: number, 
    shippingData: any,
    onSuccess: () => void,
    selectedColor: string,
    selectedSize: string
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment successful, now save to Supabase and send email via our unified route
            try {
                const priceValue = parseInt(product.price.replace('$', ''));
                const totalAmount = priceValue * quantity;

                await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...shippingData,
                        product_id: product.id,
                        product_name: product.name,
                        total_amount: totalAmount,
                        quantity: quantity,
                        // These would come from state in real app
                        color: selectedColor, 
                        size: selectedSize || 'Standard'
                    }),
                });
                onSuccess();
            } catch (err) {
                console.error('Finalization Error:', err);
                onSuccess(); // Still show success to user as payment went through
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="space-y-6">
                <h2 className="text-[9px] uppercase tracking-[0.5em] text-gray-500 font-bold">PAYMENT INFORMATION</h2>
                <PaymentElement options={{ layout: 'tabs' }} />
                {errorMessage && <div className="text-red-500 text-[9px] uppercase tracking-widest">{errorMessage}</div>}
            </div>

            <div className="pt-8">
                <button 
                    disabled={!stripe || isLoading}
                    type="submit"
                    className="w-full bg-white text-black py-4.5 text-xs font-bold uppercase tracking-[0.5em] hover:bg-neutral-200 transition-all shadow-2xl disabled:opacity-50 active:scale-[0.98]"
                >
                    {isLoading ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
                </button>
            </div>
        </form>
    );
};

const CheckoutModal = ({ isOpen, onClose, product, selectedColor, selectedSize, quantity }: CheckoutModalProps) => {
    const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [initError, setInitError] = useState<string | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [orderDate] = useState(new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }));
    const [orderId] = useState(`BA-${Math.floor(Math.random() * 90000) + 10000}`);
    
    // Shipping State
    const [shippingData, setShippingData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const updateShipping = (field: string, value: string) => {
        setShippingData(prev => ({ ...prev, [field]: value }));
    };

    const initializePayment = async () => {
        setInitError(null);
        setClientSecret(null);

        try {
            const priceValue = parseInt(product.price.replace('$', ''));
            const amount = priceValue * quantity * 100; // Stripe expects cents

            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to initialize session');
            }

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else {
                throw new Error('No client secret returned');
            }
        } catch (err: any) {
            console.error('Initialization Error:', err);
            setInitError(err.message || 'An unexpected error occurred.');
        }
    };

    useEffect(() => {
        if (isOpen && step === 'payment') {
            initializePayment();
        }
    }, [isOpen, step, product.price, quantity]);

    if (!isOpen) return null;

    const priceValue = parseInt(product.price.replace('$', ''));
    const total = priceValue * quantity;

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-700 overflow-y-auto py-12">
                <div className="w-full max-w-xl px-6 space-y-12">
                    {!showReceipt ? (
                        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                            <div className="space-y-4">
                                <h2 className="text-5xl font-bold uppercase tracking-[0.3em] text-white italic">THANK YOU</h2>
                                <div className="h-px w-24 bg-white/20 mx-auto" />
                            </div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 leading-loose max-w-sm mx-auto">
                                Your order has been placed successfully. A confirmation email will be sent shortly to <span className="text-white border-b border-white/50">{shippingData.email}</span>.
                            </p>
                            <div className="flex flex-col items-center gap-6 pt-8">
                                <button 
                                    onClick={() => setShowReceipt(true)}
                                    className="text-[10px] bbg-white text-black bg-white px-8 py-4 font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
                                >
                                    VIEW DIGITAL RECEIPT
                                </button>
                                <button 
                                    onClick={onClose}
                                    className="text-[10px] uppercase tracking-[0.4em] text-gray-500 hover:text-white border-b border-transparent hover:border-white py-2 transition-all"
                                >
                                    Return to Store
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white text-black p-8 md:p-12 shadow-2xl animate-in slide-in-from-bottom duration-700 print:shadow-none print:p-0">
                            {/* Receipt Header */}
                            <div className="flex justify-between items-start border-b border-black/10 pb-8 mb-12">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold tracking-[0.2em] italic">BOY ALONE</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Order Confirmation</p>
                                </div>
                                <div className="text-right space-y-1 text-[10px] uppercase tracking-widest">
                                    <p className="font-bold">Order {orderId}</p>
                                    <p className="text-gray-400">{orderDate}</p>
                                </div>
                            </div>

                            {/* Shipping & Billing */}
                            <div className="grid grid-cols-2 gap-12 mb-12">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">SHIPPING TO</h4>
                                    <div className="text-[10px] uppercase tracking-widest leading-loose">
                                        <p className="font-bold text-xs mb-1">{shippingData.name}</p>
                                        <p>{shippingData.phone}</p>
                                        <p>{shippingData.address}</p>
                                        <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">PAYMENT</h4>
                                    <div className="text-[10px] uppercase tracking-widest leading-loose">
                                        <p>Visa / Mastercard</p>
                                        <p>Status: <span className="font-bold italic text-green-600">CONFIRMED</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-8 mb-12 pt-8 border-t border-black/5">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 aspect-[3/4] bg-neutral-100 flex-shrink-0">
                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h5 className="text-sm font-bold uppercase tracking-widest">{product.name}</h5>
                                            <p className="text-xs font-bold">{product.price}</p>
                                        </div>
                                        <div className="text-[9px] uppercase tracking-[0.2em] text-gray-400 space-y-1">
                                            <p>Color: {selectedColor.name}</p>
                                            <p>Size: {selectedSize || 'Standard'}</p>
                                            <p>Qty: {quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="border-t-2 border-black pt-8 space-y-4">
                                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em]">
                                    <span>Subtotal</span>
                                    <span>${priceValue * quantity}</span>
                                </div>
                                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em]">
                                    <span>Shipping</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold uppercase tracking-[0.2em] pt-4 border-t border-black/10">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            {/* Receipt Footer Controls */}
                            <div className="mt-16 flex justify-between items-center print:hidden">
                                <button 
                                    onClick={() => setShowReceipt(false)}
                                    className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                                >
                                    &larr; BACK
                                </button>
                                <div className="flex gap-8">
                                    <button 
                                        onClick={() => window.print()}
                                        className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-black pb-1 hover:opacity-50 transition-opacity"
                                    >
                                        DOWNLOAD PDF
                                    </button>
                                    <button 
                                        onClick={onClose}
                                        className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-black pb-1 hover:opacity-50 transition-opacity"
                                    >
                                        EXIT
                                    </button>
                                </div>
                            </div>

                            <p className="mt-12 text-[8px] uppercase tracking-[0.5em] text-gray-300 text-center hidden print:block">
                                Thank you for shopping with Boy Alone.
                            </p>
                        </div>
                    )}
                </div>
                
                <style jsx global>{`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .print\\:block, .print\\:block * {
                            visibility: visible;
                        }
                        .bg-white {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            visibility: visible !important;
                            height: auto;
                            color: black !important;
                            background: white !important;
                        }
                        .bg-white * {
                            visibility: visible !important;
                        }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-black text-white animate-in slide-in-from-bottom duration-500 overflow-y-auto md:overflow-hidden font-light">
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-2 hover:rotate-90 transition-transform duration-300 bg-black/10 md:bg-transparent rounded-full backdrop-blur-md md:backdrop-blur-none"
            >
                <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Mobile Summary (Integrated) - Hidden on desktop */}
            <div className="md:hidden w-full p-6 pt-12 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative w-14 aspect-[3/4] bg-neutral-900 overflow-hidden shadow-xl">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="space-y-0.5">
                            <h3 className="text-sm md:text-[12px] font-bold uppercase tracking-[0.2em] italic">{product.name}</h3>
                            <div className="text-[10px] md:text-[9px] uppercase tracking-[0.15em] text-gray-500 space-y-1 md:space-y-0.5">
                                <p>COLOR: {selectedColor.name}</p>
                                <p>SIZE: {selectedSize || 'Standard'}</p>
                                <p>QTY: {quantity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] uppercase tracking-[0.3em] text-gray-500 mb-0.5">TOTAL</p>
                        <p className="text-lg font-bold italic tracking-wider">${total}</p>
                    </div>
                </div>
            </div>

            {/* Left Side: Desktop Summary - Hidden on mobile */}
            <div className="hidden md:flex w-full md:w-1/2 h-full bg-neutral-900/50 p-12 flex-col justify-center border-r border-white/10">
                <div className="max-w-md mx-auto w-full space-y-12">
                     <div className="flex items-center gap-4">
                        <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500">ORDER SUMMARY</h2>
                        <div className="h-px flex-1 bg-white/10" />
                     </div>
                     
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
                            <div className="space-y-1 text-[10px] uppercase tracking-widest text-gray-400 font-light">
                                <p>COLOR: {selectedColor.name}</p>
                                <p>SIZE: {selectedSize || 'Standard'}</p>
                                <p>QTY: {quantity}</p>
                            </div>
                        </div>
                     </div>

                     <div className="pt-12 border-t border-white/10 space-y-4">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400 font-light">
                            <span>Subtotal</span>
                            <span>{product.price} x {quantity}</span>
                        </div>
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400 font-light">
                            <span>Shipping</span>
                            <span className="text-white italic">FREE (PROMO)</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold uppercase tracking-[0.2em] pt-6">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                     </div>
                </div>
            </div>

            {/* Right Side: Flow */}
            <div className="w-full md:w-1/2 h-full bg-black flex flex-col items-center overflow-y-auto">
                <div className="max-w-md mx-auto w-full p-6 md:p-12 space-y-10 md:space-y-12">
                    <AnimatePresence mode="wait">
                        {step === 'shipping' ? (
                            <motion.form 
                                key="shipping"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                onSubmit={handleShippingSubmit} 
                                className="space-y-10"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gray-500 font-bold max-w-full truncate">SHIPPING INFO</h2>
                                    <div className="space-y-6 md:space-y-8">
                                        <div className="space-y-2">
                                            <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">Full Name</label>
                                            <input required value={shippingData.name} onChange={(e) => updateShipping('name', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors" placeholder="ENTER NAME" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">Email Address</label>
                                            <input required type="email" value={shippingData.email} onChange={(e) => updateShipping('email', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors" placeholder="ENTER EMAIL" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">Phone Number</label>
                                            <input required type="tel" value={shippingData.phone} onChange={(e) => updateShipping('phone', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors" placeholder="+1 (000) 000-0000" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">Street Address</label>
                                            <input required value={shippingData.address} onChange={(e) => updateShipping('address', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors" placeholder="STREET ADDRESS" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6 md:gap-12">
                                            <div className="space-y-2">
                                                <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">City</label>
                                                <input required value={shippingData.city} onChange={(e) => updateShipping('city', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors" placeholder="CITY" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">State</label>
                                                <div className="relative">
                                                    <select 
                                                        required 
                                                        value={shippingData.state} 
                                                        onChange={(e) => updateShipping('state', e.target.value)} 
                                                        className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled className="bg-black">SELECT</option>
                                                        {US_STATES.map(state => (
                                                            <option key={state} value={state} className="bg-black">{state.toUpperCase()}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] md:text-[11px] uppercase tracking-[0.4em] text-gray-400 ml-0.5">Zip Code</label>
                                            <input required value={shippingData.zip} onChange={(e) => updateShipping('zip', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-base md:text-sm uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors" placeholder="00000" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-white text-black py-5 md:py-6 text-xs md:text-sm font-bold uppercase tracking-[0.5em] hover:bg-neutral-200 transition-all shadow-2xl active:scale-[0.98]">
                                        CONTINUE TO PAYMENT
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div 
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="space-y-12"
                            >
                                <button 
                                    onClick={() => setStep('shipping')}
                                    className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white flex items-center gap-2 transition-colors mb-4"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    Back to Shipping
                                </button>

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
                                        <CheckoutForm 
                                            product={product} 
                                            quantity={quantity} 
                                            shippingData={shippingData}
                                            onSuccess={() => setIsSubmitted(true)} 
                                            selectedColor={selectedColor.name}
                                            selectedSize={selectedSize}
                                        />
                                    </Elements>
                                ) : initError ? (
                                    <div className="flex flex-col items-center justify-center space-y-6 pt-12 text-center">
                                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white">Initialization Failed</h3>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 leading-loose max-w-[200px]">{initError}</p>
                                        </div>
                                        <button 
                                            onClick={initializePayment}
                                            className="text-[10px] uppercase tracking-[0.4em] text-white border-b border-white py-2 hover:opacity-70 transition-opacity"
                                        >
                                            RETRY CONNECTION
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-4 pt-12">
                                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 animate-pulse">INITIALIZING SECURE SESSION...</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
