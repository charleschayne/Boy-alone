import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const collections = [
        { id: 1, name: 'Collection 001', slug: 'collection-001', image: '/assets/col1IMG_4588.JPEG' },
        { id: 2, name: 'Collection 002', slug: 'collection-002', image: '/assets/col2IMG_3341.JPEG' },
        { id: 3, name: 'Collection 003', slug: 'collection-003', image: '/assets/col3IMG_3129.JPEG' },
        { id: 4, name: 'Collection 004', slug: 'collection-004', image: '/assets/col4IMG_3243.JPEG' },
        { id: 5, name: 'Collection 005', slug: 'collection-005', image: '/assets/col5IMG_3406.JPEG' },
        { id: 6, name: 'Collection 006', slug: 'collection-006', image: '/assets/col6IMG_2015.JPEG' },
    ];

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
                                        src={collection.image}
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

    // Individual Collection Page (Generic for now)
    return (
        <main className="min-h-screen bg-white text-black pt-24 md:pt-32">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl font-bold tracking-[0.2em] uppercase mb-8 text-center">
                    {slug.replace('-', ' ')}
                </h1>

                <p className="text-center text-sm tracking-widest uppercase text-gray-500 mb-16">
                    Coming Soon
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="w-full h-[500px] bg-gray-100 mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase">
                                    Product {item}
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-medium uppercase tracking-wide text-black">
                                        Essential Item {item}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                                        Cotton Blend
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-black">$195</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
