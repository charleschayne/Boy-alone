'use client';

import { Product } from '@/data/products';
import { useState, useEffect } from 'react';

interface ProductSelectorProps {
    product: Product;
}

const ProductSelector = ({ product }: ProductSelectorProps) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        // Reset size when color changes if current size is not available in new color
        if (selectedSize && !selectedColor.sizes.includes(selectedSize)) {
            setSelectedSize('');
        }
    }, [selectedColor, selectedSize]);

    return (
        <div className="flex flex-col space-y-6 py-6">
            {/* Color Selection */}
            <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Color: {selectedColor.name}</h4>
                <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedColor(color)}
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
            <div>
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

            {/* Add to Cart Button (Mock) */}
            <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold mt-4 hover:bg-neutral-800 transition-colors">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductSelector;
