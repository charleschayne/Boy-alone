'use client';

import Image from 'next/image';
import { Product } from '@/data/products';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full aspect-[3/4] bg-neutral-100 mb-6 relative overflow-hidden">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-700 ease-in-out ${
                        isHovered ? 'scale-105 opacity-100' : 'opacity-90'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
            </div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black group-hover:opacity-70 transition-opacity">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">
                        {product.colors.length} Colors Available
                    </p>
                </div>
                <p className="text-sm font-medium text-black">{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
