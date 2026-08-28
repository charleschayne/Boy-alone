'use client';

import { Product, ProductColor } from '@/data/products';
import { useState, useEffect } from 'react';
import CheckoutModal from './CheckoutModal';
import { getPromoDiscountRate } from '@/lib/promo';
import { getPriceValue } from '@/lib/earlyAccess';

interface ProductSelectorProps {
    product: Product;
    selectedColor: ProductColor;
    onColorChange: (color: ProductColor) => void;
}

const ProductSelector = ({ product, selectedColor, onColorChange }: ProductSelectorProps) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState('');

    const discountRate = getPromoDiscountRate(appliedPromo);

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleApplyPromo = () => {
        if (getPromoDiscountRate(promoInput) > 0) {
            setAppliedPromo(promoInput);
        } else {
            setAppliedPromo('');
        }
    };

    useEffect(() => {
        // Reset size when color changes if current size is not available in new color
        if (selectedSize && !selectedColor.sizes.includes(selectedSize)) {
            setSelectedSize('');
        }
    }, [selectedColor, selectedSize]);

    const unitPrice = getPriceValue(product.price);
    const subtotal = unitPrice * quantity;
    const discountAmount = appliedPromo ? subtotal * discountRate : 0;
    const discountedTotal = subtotal - discountAmount;

    return (
        <div className="flex flex-col space-y-6 py-6 font-light" style={{ fontFamily: 'var(--font-alike-angular), "Alike Angular", serif' }}>
            {/* Color Selection */}
            <div className={product.isSoldOut ? 'opacity-30 pointer-events-none' : ''}>
                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Color: {selectedColor.name}</h4>
                <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => onColorChange(color)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                                selectedColor.name === color.name
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-200 hover:border-black'
                            }`}
                        >
                            {color.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div className={product.isSoldOut ? 'opacity-30 pointer-events-none' : ''}>
                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Size: {selectedSize || 'Select Size'}</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedColor.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-10 flex items-center justify-center text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                                selectedSize === size
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-200 hover:border-black'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price & Shipping */}
            <div className="border-t border-gray-100 pt-6">
                <div className="flex items-baseline gap-4">
                    <span className="text-2xl font-bold">{product.price}</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium mt-1">
                    FREE SHIPPING
                </p>
            </div>

            {/* Promo Code */}
            <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Promo Code</h4>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyPromo(); } }}
                        placeholder="ENTER CODE"
                        className="flex-1 bg-transparent border border-gray-200 text-black text-[10px] uppercase tracking-[0.2em] px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                        onClick={handleApplyPromo}
                        className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold border border-black bg-black text-white hover:bg-neutral-800 transition-colors"
                    >
                        APPLY
                    </button>
                </div>
                {appliedPromo ? (
                    <div className="flex items-center justify-between mt-3 text-[10px] uppercase tracking-[0.2em]">
                        <p className="text-green-600 font-medium">Code "{appliedPromo}" applied — 10% off</p>
                        <button onClick={() => { setAppliedPromo(''); setPromoInput(''); }} className="text-gray-400 underline hover:text-black">
                            Remove
                        </button>
                    </div>
                ) : promoInput && getPromoDiscountRate(promoInput) === 0 ? (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-500 mt-3">Invalid promo code</p>
                ) : null}
                {appliedPromo && (
                    <div className="mt-4 border border-gray-200 p-4 space-y-1.5">
                        <div className="flex justify-between text-[11px] uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[11px] uppercase tracking-widest text-green-600">
                            <span>Promo ({Math.round(discountRate * 100)}%)</span>
                            <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest pt-1.5 border-t border-gray-200">
                            <span>Total</span>
                            <span>${discountedTotal.toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Quantity Selection */}
            <div className={product.isSoldOut ? 'opacity-30 pointer-events-none' : ''}>
                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Quantity: {quantity}</h4>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={decrementQuantity}
                        className="w-10 h-10 flex items-center justify-center text-xs border border-gray-200 hover:border-black transition-all"
                    >
                        -
                    </button>
                    <span className="text-xs uppercase tracking-widest font-medium w-6 text-center">{quantity}</span>
                    <button 
                        onClick={incrementQuantity}
                        className="w-10 h-10 flex items-center justify-center text-xs border border-gray-200 hover:border-black transition-all"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Shipping Notice */}
            {!product.isSoldOut && (
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] italic font-medium">
                        Free shipping — 2 weeks delivery
                    </p>
                </div>
            )}

            {/* Buy Now Button */}
            <button 
                disabled={product.isSoldOut}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold ${
                    product.isSoldOut 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 italic mt-4' 
                        : 'bg-black text-white hover:bg-neutral-800 mt-2'
                } transition-all shadow-2xl`}
            >
                {product.isSoldOut ? 'SOLD OUT' : 'BUY NOW'}
            </button>

            {/* Checkout Modal */}
            <CheckoutModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                discountRate={discountRate}
            />
        </div>
    );
};

export default ProductSelector;
