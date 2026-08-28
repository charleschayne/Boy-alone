'use client';
 
 import { Product, ProductColor } from '@/data/products';
 import { useState } from 'react';
 import ProductGallery from './ProductGallery';
 import ProductSelector from './ProductSelector';
 
 interface ProductViewProps {
     product: Product;
 }
 
 const ProductView = ({ product }: ProductViewProps) => {
     const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
 
     return (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
             {/* Product Gallery Slideshow */}
             <ProductGallery 
                 images={product.images} 
                 productName={product.name} 
                 selectedImage={selectedColor.featuredImage}
             />
 
             {/* Product Info & Selector */}
             <div className="flex flex-col h-full">
                <div className="border-b border-gray-100 pb-8 mb-8">
                    <div className="flex justify-between items-baseline mb-4">
                        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] md:tracking-widest">
                            {product.name}
                        </h2>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">{product.description}</p>
                </div>
                
                <ProductSelector 
                    product={product} 
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                />

                <div className="mt-auto pt-12">
                    <details className="group border-t border-gray-100 py-4">
                        <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] uppercase tracking-widest font-bold">
                            Product Details
                            <span className="transform group-open:rotate-180 transition-transform">↓</span>
                        </summary>
                        <div className="pt-4 text-xs leading-relaxed text-gray-600 tracking-wide uppercase">
                            {product.description}
                        </div>
                    </details>
                    <details className="group border-t border-b border-gray-100 py-4">
                        <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] uppercase tracking-widest font-bold">
                            Shipping & Returns
                            <span className="transform group-open:rotate-180 transition-transform">↓</span>
                        </summary>
                        <div className="pt-4 text-xs leading-relaxed text-gray-600 tracking-wide uppercase">
                            FREE SHIPPING. US shipping only.
                        </div>
                    </details>
                </div>
             </div>
         </div>
     );
 };
 
 export default ProductView;
