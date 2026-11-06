import Image from 'next/image';
import Link from 'next/link';
import type { Collection } from '@/data/products';

const Hero = ({ collection }: { collection?: Collection }) => {
    if (!collection) return null;
    const product = collection.products[0];

    return (
        <section className="relative flex min-h-screen w-full flex-col overflow-hidden text-white bg-black md:block md:h-screen md:min-h-[600px]">
            <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:aspect-auto md:h-full">
                <Image
                    src={`/assets/collection%204/${encodeURIComponent('BOY ALONE — SHINING THROUGH THE PAIN BROKEN FACE & GRILLS GRAPHIC CREWNECKIMG_4177.JPEG')}`}
                    alt="Boy Alone Broken Face & Grills crewneck against a red background"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/10 to-black/20 md:block" />
            </div>
            <div className="flex flex-1 flex-col justify-center px-6 py-10 text-center md:absolute md:inset-x-0 md:bottom-0 md:block md:flex-none md:px-12 md:py-24">
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] mb-4">{product.collection}</p>
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-6">{product.name}</h1>
                <p className="text-xs md:text-sm leading-relaxed tracking-widest max-w-xl mx-auto mb-8">{product.tagline}</p>
                <Link href={`/collections/${collection.slug}`} className="inline-block bg-white text-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                    Shop now — {product.price}
                </Link>
            </div>
        </section>
    );
};

export default Hero;
