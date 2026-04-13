import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { collections, getCollectionBySlug } from '@/data/products';
import ProductSelector from '@/components/ProductSelector';
import ProductGallery from '@/components/ProductGallery';

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (slug === 'all') {
        return (
            <main className="min-h-screen bg-black text-white pt-24 md:pt-32">
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-16 text-center text-white">
                        All Collections
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {collections.map((collection) => {
                            const product = collection.products[0];
                            const isSoldOut = product?.isSoldOut;
                            const displayHoverImage = collection.hoverImage || (product?.images && product.images.length > 1 ? product.images[1] : null);
                            const price = product?.price || '';

                            return (
                                <Link href={`/collections/${collection.slug}`} key={collection.id} className="group cursor-pointer">
                                    <div className="w-full aspect-[3/4] bg-neutral-900 mb-6 relative overflow-hidden">
                                        {/* First Image (Default) */}
                                        <Image
                                            src={collection.featuredImage}
                                            alt={collection.name}
                                            fill
                                            className={`object-cover transition-opacity duration-700 ease-in-out ${displayHoverImage ? 'group-hover:opacity-0' : ''}`}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Second Image (Hover) */}
                                        {displayHoverImage && (
                                            <Image
                                                src={displayHoverImage}
                                                alt={`${collection.name} Detail`}
                                                fill
                                                className={`absolute inset-0 object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100`}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        )}
                                        {isSoldOut && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <span className="text-[10px] bg-white text-black px-6 py-2 font-bold uppercase tracking-[0.5em] italic shadow-xl">SOLD OUT</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-white group-hover:opacity-70 transition-opacity">
                                                {collection.name}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                    {collection.products.length > 0 ? `${collection.products.length} Items` : 'Available'}
                                                </p>
                                                {price && (
                                                    <p className="text-xs text-white font-bold tracking-widest">{price}</p>
                                                )}
                                            </div>
                                        </div>
                                        <p className={`text-sm font-medium border-b transition-all uppercase tracking-widest ${isSoldOut ? 'text-gray-500 border-transparent italic line-through' : 'text-white border-white/0 group-hover:border-white/100'}`}>
                                            {isSoldOut ? 'SOLD OUT' : 'Explore'}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <Footer />
            </main>
        );
    }

    const collection = getCollectionBySlug(slug);

    if (!collection) {
        return (
            <main className="min-h-screen bg-white text-black pt-24 md:pt-32 flex flex-col items-center justify-center">
                <Navbar isLight />
                <h1 className="text-2xl font-bold uppercase tracking-widest">Collection Not Found</h1>
                <Link href="/collections/all" className="mt-8 text-xs uppercase tracking-widest underline">Back to All Collections</Link>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black pt-24 md:pt-32">
            <Navbar isLight />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase mb-6 leading-tight">
                        {collection.name}
                    </h1>
                    <div className="w-24 h-px bg-black mx-auto"></div>
                </div>

                {collection.products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-sm tracking-[0.3em] uppercase text-gray-400 italic">Coming Soon</p>
                    </div>
                ) : (
                    <div className="space-y-32">
                        {collection.products.map((product) => (
                            <div key={product.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                                {/* Product Gallery Slideshow */}
                                <ProductGallery images={product.images} productName={product.name} />

                                {/* Product Info & Selector */}
                                <div className="flex flex-col h-full">
                                    <div className="border-b border-gray-100 pb-8 mb-8">
                                        <div className="flex justify-between items-baseline mb-4">
                                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] md:tracking-widest">
                                                {product.name}
                                            </h2>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xl font-medium">{product.price}</span>
                                                <span className="text-[10px] bg-black text-white px-2 py-1 font-bold uppercase tracking-widest self-end">PRE-ORDER</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Premium Quality Apparel — 2 Weeks Shipping</p>
                                    </div>
                                    
                                    <ProductSelector product={product} />

                                    <div className="mt-auto pt-12">
                                        <details className="group border-t border-gray-100 py-4">
                                            <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] uppercase tracking-widest font-bold">
                                                Product Details
                                                <span className="transform group-open:rotate-180 transition-transform">↓</span>
                                            </summary>
                                            <div className="pt-4 text-xs leading-relaxed text-gray-600 tracking-wide uppercase">
                                                Handcrafted with premium materials. This piece represents the core philosophy of BOY ALONE – minimal design with maximal impact.
                                            </div>
                                        </details>
                                        <details className="group border-t border-b border-gray-100 py-4">
                                            <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] uppercase tracking-widest font-bold">
                                                Shipping & Returns
                                                <span className="transform group-open:rotate-180 transition-transform">↓</span>
                                            </summary>
                                            <div className="pt-4 text-xs leading-relaxed text-gray-600 tracking-wide uppercase">
                                                PRE-ORDER ITEM: Please allow approximately 2 weeks for shipping. US shipping only. 
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
