import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/data/products';

const Hero = () => {
    const collection = collections.find((item) => item.slug === 'boy-alone-sin-no-more-graphic-zip-up-hoodie')!;
    const product = collection.products[0];

    return (
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden text-white bg-black">
            <Image
                src={collection.featuredImage}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 px-6 py-16 md:px-12 md:py-24 text-center">
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] mb-4">{product.collection}</p>
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-6">SIN NO MORE</h1>
                <p className="text-xs md:text-sm leading-relaxed tracking-widest max-w-xl mx-auto mb-8">{product.tagline}</p>
                <Link href={`/collections/${collection.slug}`} className="inline-block bg-white text-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                    Shop the hoodie — {product.price}
                </Link>
            </div>
        </section>
    );
};

export default Hero;
