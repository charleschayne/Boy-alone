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
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
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
    
    // Shipping State
    const [shippingData, setShippingData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
                <div className="text-center space-y-6 max-w-md px-6">
                    <h2 className="text-4xl font-bold uppercase tracking-[0.3em] text-white italic">THANK YOU</h2>
                    <p className="text-xs uppercase tracking-widest text-gray-400 leading-loose">
                        Your order has been placed successfully. A confirmation email will be sent shortly to <span className="text-white">{shippingData.email}</span>.
                    </p>
                    <button 
                        onClick={onClose}
                        className="mt-8 text-[10px] uppercase tracking-widest text-white border-b border-white py-2 hover:opacity-70 transition-opacity"
                    >
                        Return to Store
                    </button>
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
            <div className="w-full md:w-1/2 h-full bg-black p-12 flex flex-col justify-center overflow-y-auto font-light">
                <div className="max-w-md mx-auto w-full space-y-12 py-12">
                    {step === 'shipping' ? (
                        <form onSubmit={handleShippingSubmit} className="space-y-12 animate-in fade-in duration-500">
                            <div className="space-y-8">
                                <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">SHIPPING INFORMATION</h2>
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                                        <input required value={shippingData.name} onChange={(e) => updateShipping('name', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="ENTER NAME" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                                        <input required type="email" value={shippingData.email} onChange={(e) => updateShipping('email', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="ENTER EMAIL" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Street Address</label>
                                        <input required value={shippingData.address} onChange={(e) => updateShipping('address', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="STREET ADDRESS" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">City</label>
                                            <input required value={shippingData.city} onChange={(e) => updateShipping('city', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="CITY" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Zip Code</label>
                                            <input required value={shippingData.zip} onChange={(e) => updateShipping('zip', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors" placeholder="00000" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-white text-black py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-colors shadow-2xl">
                                CONTINUE TO PAYMENT
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-12">
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
                                <div className="flex flex-col items-center justify-center space-y-6 pt-12 animate-in fade-in duration-500 text-center">
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
