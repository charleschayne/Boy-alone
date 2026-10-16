export interface ProductColor {
    name: string;
    hex?: string;
    sizes: string[];
    featuredImage?: string;
}

export interface Product {
    id: string;
    name: string;
    price: string;
    slug: string;
    images: string[];
    description?: string;
    collection?: string;
    details?: string[];
    tagline?: string;
    discountPrices?: { label: string; price: string }[];
    releaseSchedule?: { label: string; dates: string }[];
    colors: ProductColor[];
    isSoldOut?: boolean;
    discountEligible?: boolean;
}

export interface Collection {
    id: string;
    name: string;
    slug: string;
    description?: string;
    featuredImage: string;
    hoverImage?: string;
    products: Product[];
}

const hoodieImage = (number: string) =>
    `/assets/collection%204/${encodeURIComponent(`BOY ALONE — SHINING THROUGH THE PAIN “SIN NO MORE” GRAPHIC ZIP-UP HOODIEIMG_${number}.JPG`)}`;

const crewneckImage = (number: string) =>
    `/assets/collection%204/${encodeURIComponent(`BOY ALONE — SHINING THROUGH THE PAIN STATEMENT GRAPHIC CREWNECKIMG_${number}.JPEG`)}`;

const stripedTeeImage = (number: string) =>
    `/assets/collection%204/${encodeURIComponent(`BOY ALONE — SHINING THROUGH THE PAIN SUNGLASSES & GRILLS STRIPED GRAPHIC TEEIMG_${number}.JPEG`)}`;

const brokenFaceCrewneckImage = (number: string) =>
    `/assets/collection%204/${encodeURIComponent(`BOY ALONE — SHINING THROUGH THE PAIN BROKEN FACE & GRILLS GRAPHIC CREWNECKIMG_${number}.JPG`)}`;

const workwearJacketImage = (filename: string) =>
    `/assets/collection%205/${encodeURIComponent(`BOY ALONE — SIN NO MORE WORKWEAR JACKETIMG_${filename}`)}`;

const brokenFaceJacketImage = (number: string) =>
    `/assets/collection%205/${encodeURIComponent(`BOY ALONE — SHINING THROUGH THE PAIN BROKEN FACE & GRILLS GRAPHIC WORKWEAR JACKETIMG_${number}.webp`)}`;

const fall26Collections: Collection[] = [
    {
        id: 'shining-through-the-pain-fall-26',
        name: 'Shining Through The Pain — Fall ’26 Collection',
        slug: 'shining-through-the-pain-fall-26',
        description: 'Pain, transformation, and redemption. Limited Fall ’26 release.',
        featuredImage: hoodieImage('9212'),
        hoverImage: hoodieImage('9199'),
        products: [
            {
                id: 'boy-alone-sin-no-more-workwear-jacket',
                name: 'BOY ALONE — SIN NO MORE WORKWEAR JACKET',
                slug: 'boy-alone-sin-no-more-workwear-jacket',
                discountEligible: false,
                price: '$100.00',
                collection: 'Shining Through The Pain — Fall ’26 Collection',
                description: 'A heavyweight workwear jacket created for those who survived what was meant to destroy them.\n\nThe distressed lettering reflects the battles, while the workwear construction represents resilience, discipline, and rebuilding your life one day at a time.\n\nEvery scar has a history.\nEvery chapter has an ending.\n\nSIN NO MORE.',
                details: [
                    'Black workwear jacket',
                    'Oversized SIN NO MORE back graphic',
                    'Original BOY ALONE artwork',
                    'Heavy-duty workwear construction',
                    'Full front zipper',
                    'Classic collar',
                    'Long sleeves',
                    'Side pockets',
                    'Limited Fall ’26 release',
                ],
                tagline: 'LEAVE THE SIN. KEEP THE SCARS. ⚔️',
                images: ['9696.webp', '9680.webp', '9723.webp', '9630.webp', '9702.webp', '9721.webp', '9664.webp', '9583.webp'].map(workwearJacketImage),
                colors: [
                    { name: 'Black', hex: '#000000', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large', '3X-Large'], featuredImage: workwearJacketImage('9696.webp') },
                ],
            },
            {
                id: 'boy-alone-broken-face-grills-graphic-workwear-jacket',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN BROKEN FACE & GRILLS GRAPHIC WORKWEAR JACKET',
                slug: 'boy-alone-broken-face-grills-graphic-workwear-jacket',
                discountEligible: false,
                price: '$100.00',
                collection: 'Shining Through The Pain — Fall ’26 Collection',
                description: 'A heavyweight workwear jacket built around the scars we carry, the pain we survive, and the strength we earn through it.\n\nFeaturing original BOY ALONE artwork of a damaged face with bloodshot eyes, visible scars, and shining grills across the front.\n\nThe damaged face represents every wound life leaves behind. The shining grills represent refusing to let suffering steal your confidence, purpose, or light.\n\nThe front tells the story of what you’ve survived.\n\nBroken, but never defeated.\n\nThe pain was never hidden.\n\nWe put it on fabric.',
                details: [
                    'Black workwear jacket',
                    'Oversized front character artwork',
                    'Bloodshot eyes and scar details',
                    'Shining BOY ALONE grills',
                    'Original BOY ALONE artwork',
                    'Full front zipper',
                    'Classic collar',
                    'Long sleeves',
                    'Side pockets',
                    'Limited Fall ’26 release',
                ],
                tagline: 'THE FACE STAYED BROKEN. THE GRILLS KEPT SHINING. ⚔️',
                images: ['9872', '9881', '9898', '9912', '9953'].map(brokenFaceJacketImage),
                colors: [
                    { name: 'Black', hex: '#000000', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large', '3X-Large'], featuredImage: brokenFaceJacketImage('9872') },
                ],
            },
            {
                id: 'boy-alone-sin-no-more-graphic-zip-up-hoodie',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN “SIN NO MORE” GRAPHIC ZIP-UP HOODIE',
                slug: 'boy-alone-sin-no-more-graphic-zip-up-hoodie',
                price: '$130.00',
                collection: 'Shining Through The Pain — Fall ’26 Collection',
                description: 'A statement graphic zip-up hoodie built around pain, transformation, and redemption.\n\nFeaturing original artwork of a damaged face with bloodshot eyes and tears across the front, paired with a bold red SIN NO MORE graphic across the back.\n\nThe broken face represents the scars and struggles life leaves behind, while the message on the back symbolizes growth, change, and leaving the past behind.\n\nDesigned for those who have experienced darkness but refuse to let their pain define their future.\n\nThe pain was never hidden. We put it on fabric.',
                details: [
                    'Black graphic zip-up hoodie',
                    'Oversized front face artwork',
                    'Bloodshot eye and tear details',
                    'Bold red SIN NO MORE back graphic',
                    'Full-length front zipper',
                    'Hooded design',
                    'Original BOY ALONE artwork',
                    'Front and back graphic placement',
                    'Limited Fall ’26 release',
                ],
                tagline: 'THE FACE SHOWS THE DAMAGE. THE BACK SHOWS THE CHANGE. ⚔️',
                discountPrices: [
                    { label: '10% Community Members Discount', price: '$117.00' },
                    { label: 'Regular Retail Price', price: '$130.00' },
                ],
                releaseSchedule: [
                    { label: 'Private Early Access', dates: 'October 9th & 10th, 2026' },
                    { label: 'Public Release', dates: 'October 16th & 17th, 2026' },
                ],
                images: ['9212', '9199', '9205'].map(hoodieImage),
                colors: [
                    { name: 'Black', hex: '#000000', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'], featuredImage: hoodieImage('9212') },
                ],
            },
            {
                id: 'boy-alone-shining-through-the-pain-statement-graphic-crewneck',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN STATEMENT GRAPHIC CREWNECK',
                slug: 'boy-alone-shining-through-the-pain-statement-graphic-crewneck',
                price: '$85.00',
                collection: 'Shining Through The Pain — Fall ’26 Collection',
                description: 'A statement graphic crewneck built around the message that defines BOY ALONE — turning pain into purpose.\n\nFeaturing an oversized white graphic panel across the front with the handwritten SHINING THROUGH THE PAIN artwork, BOY ALONE signature, and Parental Advisory detail.\n\nThe raw, imperfect lettering represents the struggles, scars, and experiences that shape who we become.\n\nDesigned for those who have been through darkness but continue to find their light.\n\nEvery scar tells a story. Every struggle leaves a mark. But through it all, we keep shining.\n\nThe pain was never hidden. We put it on fabric.',
                details: [
                    'Black graphic crewneck sweatshirt',
                    'Oversized white front graphic panel',
                    'SHINING THROUGH THE PAIN handwritten artwork',
                    'BOY ALONE signature detail',
                    'Parental Advisory graphic detail',
                    'Ribbed crew neckline',
                    'Long sleeves',
                    'Original BOY ALONE artwork',
                    'Statement front graphic',
                    'Limited Fall ’26 release',
                ],
                tagline: 'THE PAIN LEFT MARKS. THE SHINE NEVER LEFT. ⚔️',
                discountPrices: [
                    { label: '10% Community Members Discount', price: '$76.50' },
                    { label: 'Regular Retail Price', price: '$85.00' },
                ],
                releaseSchedule: [
                    { label: 'Private Early Access', dates: 'October 9th & 10th, 2026' },
                    { label: 'Public Release', dates: 'October 16th & 17th, 2026' },
                ],
                images: ['9039', '9026', '9045'].map(crewneckImage),
                colors: [
                    { name: 'Black', hex: '#000000', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'], featuredImage: crewneckImage('9039') },
                ],
            },
            {
                id: 'boy-alone-sunglasses-grills-striped-graphic-tee',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN SUNGLASSES & GRILLS STRIPED GRAPHIC TEE',
                slug: 'boy-alone-sunglasses-grills-striped-graphic-tee',
                price: '$100.00',
                collection: 'Shining Through The Pain — Fall ’26 Collection',
                description: 'A statement striped graphic tee built around the beauty of surviving life’s ugliest moments.\n\nFeaturing original BOY ALONE artwork of a damaged face wearing layered sunglasses and shining gold grills, displayed across a bold black-and-white striped silhouette.\n\nThe scars, bruises, and bandages represent the pain and damage life leaves behind, while the shining gold grills symbolize confidence, resilience, and finding light through darkness.\n\nFinished with the signature BOY ALONE chest logo, this piece brings together raw emotion, bold artwork, and streetwear fashion.\n\nDesigned for those who have been through pain but refuse to let their experiences take away their shine.\n\nThe pain was never hidden. We put it on fabric.',
                details: [
                    'Black-and-white striped graphic tee',
                    'Oversized front face artwork',
                    'Layered sunglasses graphic',
                    'Shining gold grills detail',
                    'Scars, bruises, and bandage artwork',
                    'BOY ALONE chest logo',
                    'Short sleeves',
                    'Crew neckline',
                    'Original BOY ALONE artwork',
                    'Statement front graphic',
                    'Limited Fall ’26 release',
                ],
                tagline: 'THE FACE TOOK DAMAGE. THE SHINE SURVIVED. ⚔️',
                discountPrices: [
                    { label: '10% Community Members Discount', price: '$90.00' },
                    { label: 'Regular Retail Price', price: '$100.00' },
                ],
                releaseSchedule: [
                    { label: 'Private Early Access', dates: 'October 9th & 10th, 2026' },
                    { label: 'Public Release', dates: 'October 16th & 17th, 2026' },
                ],
                images: ['9352', '9378'].map(stripedTeeImage),
                colors: [
                    { name: 'Black & White Stripes', sizes: ['Small', 'Medium', 'Large', 'X-Large'], featuredImage: stripedTeeImage('9352') },
                ],
            },
            {
                id: 'boy-alone-broken-face-grills-graphic-crewneck',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN BROKEN FACE & GRILLS GRAPHIC CREWNECK',
                slug: 'boy-alone-broken-face-grills-graphic-crewneck',
                price: '$100.00',
                collection: 'Shining Through The Pain — Fall ’26 Collection',
                description: 'A statement graphic crewneck built around the scars we carry, the pain we experience, and the strength we find through it all.\n\nFeaturing original BOY ALONE artwork of a damaged face with bloodshot eyes, scars, and shining grills across the front, paired with a rear-view character graphic on the back.\n\nThe damaged face represents the ugly experiences life puts us through, while the shining grills symbolize resilience, confidence, and finding light in the darkest moments.\n\nThe front reveals the pain the world can see. The back represents the struggles and scars that remain hidden.\n\nTwo sides of the same story. The pain you see and the pain you don’t.\n\nThe pain was never hidden. We put it on fabric.',
                details: [
                    'Black graphic crewneck sweatshirt',
                    'Oversized front character artwork',
                    'Rear-view character artwork on the back',
                    'Bloodshot eyes and scar details',
                    'Shining BOY ALONE grills',
                    'Original BOY ALONE artwork',
                    'Front and back graphic placement',
                    'Long sleeves',
                    'Crew neckline',
                    'Limited Fall ’26 release',
                ],
                tagline: 'YOU SEE THE SCARS. YOU DON’T KNOW THE STORY. ⚔️',
                discountPrices: [
                    { label: '10% Community Members Discount', price: '$90.00' },
                    { label: 'Regular Retail Price', price: '$100.00' },
                ],
                releaseSchedule: [
                    { label: 'Private Early Access', dates: 'October 9th & 10th, 2026' },
                    { label: 'Public Release', dates: 'October 16th & 17th, 2026' },
                ],
                images: ['9271', '9301'].map(brokenFaceCrewneckImage),
                colors: [
                    { name: 'Black', hex: '#000000', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'], featuredImage: brokenFaceCrewneckImage('9271') },
                ],
            },
        ],
    },
];

export const collections: Collection[] = fall26Collections.flatMap((collection) =>
    collection.products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.collection,
        featuredImage: product.images[0],
        hoverImage: product.images[1],
        products: [product],
    }))
);

export const getAllProducts = () => {
    return collections.flatMap((c) => c.products);
};

export const getCollectionBySlug = (slug: string) => {
    return collections.find((c) => c.slug === slug);
};

export const getProductBySlug = (slug: string) => {
    return getAllProducts().find((p) => p.slug === slug);
};
