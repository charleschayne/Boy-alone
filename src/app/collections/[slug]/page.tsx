import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <main className="min-h-screen bg-white text-black pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl font-bold tracking-[0.2em] uppercase mb-8 text-center">
                    {slug} Collection
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
