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
                        {collections.map((collection) => (
                            <Link href={`/collections/${collection.slug}`} key={collection.id} className="group block">
                                <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 mb-6">
                                    <Image
                                        src={collection.featuredImage}
                                        alt={collection.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white group-hover:opacity-70 transition-opacity">
                                        {collection.name}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide">
                                        View Collection
                                    </p>
                                </div>
                            </Link>
                        ))}
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
                <Navbar />
                <h1 className="text-2xl font-bold uppercase tracking-widest">Collection Not Found</h1>
                <Link href="/collections/all" className="mt-8 text-xs uppercase tracking-widest underline">Back to All Collections</Link>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black pt-24 md:pt-32">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.3em] uppercase mb-6">
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
                                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">
                                                {product.name}
                                            </h2>
                                            <span className="text-xl font-medium">{product.price}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Premium Quality Apparel</p>
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
                                                Worldwide shipping available. Returns accepted within 14 days of delivery.
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
