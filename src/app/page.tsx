import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const collections = [
  {
    id: 1,
    name: "Collection 01",
    price: "$195",
    images: ["/assets/col1IMG_4588.JPEG", "/assets/col1IMG_4589.JPEG"]
  },
  {
    id: 2,
    name: "Collection 02",
    price: "$225",
    images: ["/assets/col2IMG_3341.JPEG", "/assets/col2IMG_3365.JPEG"]
  },
  {
    id: 3,
    name: "Collection 03",
    price: "$180",
    images: ["/assets/col3IMG_3129.JPEG", "/assets/col3IMG_3135.JPEG"]
  },
  {
    id: 4,
    name: "Collection 04",
    price: "$250",
    images: ["/assets/col4IMG_3243.JPEG", "/assets/col4IMG_3250.JPEG"]
  },
  {
    id: 5,
    name: "Collection 05",
    price: "$210",
    images: ["/assets/col5IMG_3406.JPEG", "/assets/col5IMG_3443.JPEG"]
  },
  {
    id: 6,
    name: "Collection 06",
    price: "$195",
    images: ["/assets/col6IMG_2015.JPEG", "/assets/col6IMG_2068.JPEG"]
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-mono">
      <Navbar />
      <Hero />

      {/* Featured Collection Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-12 text-center text-black">
            Latest Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {collections.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="w-full h-[500px] md:h-[600px] bg-gray-100 mb-6 relative overflow-hidden">
                  {/* First Image (Default) */}
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Second Image (Hover) */}
                  <Image
                    src={item.images[1]}
                    alt={`${item.name} Detail`}
                    fill
                    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Available Now</p>
                  </div>
                  <p className="text-sm font-medium text-black">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
