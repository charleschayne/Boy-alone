import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { collections } from '@/data/products';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden max-w-full">
      <Navbar />
      <Hero />

      {/* Featured Collection Section */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-12 text-center text-white">
            Latest Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {collections.map((collection) => {
              const product = collection.products[0];
              const isSoldOut = product?.isSoldOut;
              const displayHoverImage = collection.hoverImage || (product?.images && product.images.length > 1 ? product.images[1] : null);
              const price = product?.price || '';

              return (
                <Link href={`/collections/${collection.slug}`} key={collection.id} className="group cursor-pointer">
                  <div className="w-full aspect-[3/4] bg-neutral-100 mb-6 relative overflow-hidden">
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
      </section>

      <Footer />
    </main>
  );
}
