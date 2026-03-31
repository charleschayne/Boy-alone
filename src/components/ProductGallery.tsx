'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-6">
            {/* Main Image Slideshow */}
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden group">
                <Image
                    src={images[currentIndex]}
                    alt={`${productName} ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500 ease-in-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                />

                {/* Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/5 hover:bg-black/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <span className="text-2xl font-light">←</span>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/5 hover:bg-black/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <span className="text-2xl font-light">→</span>
                        </button>
                    </>
                )}

                {/* Counter */}
                <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-white/50 bg-black/10 px-2 py-1">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Preview */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer transition-all duration-300 ${
                                currentIndex === idx ? 'ring-2 ring-black opacity-100' : 'opacity-40 hover:opacity-100'
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`${productName} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 15vw, 10vw"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
