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
    colors: ProductColor[];
    isSoldOut?: boolean;
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

const poloImage = (number: string) =>
    `/assets/Shining%20collection%203/${encodeURIComponent(`GIRL ALONE — SHINNINGTHROUGHTHEPAINSTRIPEDPOLOIMG_${number}.JPEG`)}`;

const croppedTeeImage = (number: string) =>
    `/assets/Shining%20collection%203/${encodeURIComponent(`GIRL ALONE — SHINNING THROUGH THE PAIN CROPPED TEE (PINK)IMG_${number}.JPEG`)}`;

const raglanImage = (number: string) =>
    `/assets/Shining%20collection%203/${encodeURIComponent(`GIRL ALONE — PINK CAMOUFLAGE EYES RAGLAN CROP TEEIMG_${number}.JPEG`)}`;

const sunglassesTeeImage = (number: string) =>
    `/assets/Shining%20collection%203/${encodeURIComponent(`GIRL ALONE — SHINNING THROUGH THE PAIN SUNGLASSES & GRILLS GRAPHIC TEEIMG_${number}.JPEG`)}`;

export const collections: Collection[] = [
    {
        id: 'girl-alone-shinning-through-the-pain-striped-polo',
        name: 'GIRL ALONE — SHINNING THROUGH THE PAIN STRIPED POLO',
        slug: 'girl-alone-shinning-through-the-pain-striped-polo',
        description: 'Shinning Through The Pain 3.0 — Women’s Collection',
        featuredImage: poloImage('7926'),
        hoverImage: poloImage('7788'),
        products: [
            {
                id: 'girl-alone-shinning-through-the-pain-striped-polo-product',
                name: 'GIRL ALONE — SHINNING THROUGH THE PAIN STRIPED POLO',
                slug: 'girl-alone-shinning-through-the-pain-striped-polo',
                price: '$100.00',
                collection: 'Shinning Through The Pain 3.0 — Women’s Collection',
                description: 'A statement polo built around the Shinning Through The Pain story. Featuring bold horizontal stripes, an oversized relaxed silhouette, contrast collar, GIRL ALONE embroidered chest logo, and an oversized hand-drawn Shinning Through The Pain graphic across the front.\n\nMade for the girl who carries the scars without letting them take away her shine.',
                details: [
                    'Oversized / relaxed fit',
                    'Short sleeve polo',
                    'Contrast collar',
                    'GIRL ALONE embroidered chest detail',
                    'Large front graphic',
                    'Limited availability',
                    'No restock',
                ],
                tagline: 'SHE GOT SCARS YOU CAN’T SEE. BUT A SHINE YOU CAN’T MISS.',
                images: ['7926', '7929', '7932', '7945', '7788', '7814', '7817'].map(poloImage),
                colors: [
                    { name: 'Red / White', sizes: ['Small'], featuredImage: poloImage('7926') },
                    { name: 'Pink / White', sizes: ['Small'], featuredImage: poloImage('7788') },
                ],
            },
        ],
    },
    {
        id: 'girl-alone-shinning-through-the-pain-cropped-tee-pink',
        name: 'GIRL ALONE — SHINNING THROUGH THE PAIN CROPPED TEE (PINK)',
        slug: 'girl-alone-shinning-through-the-pain-cropped-tee-pink',
        description: 'Shinning Through The Pain 3.0 — Women’s Collection',
        featuredImage: croppedTeeImage('7981'),
        hoverImage: croppedTeeImage('7992'),
        products: [
            {
                id: 'girl-alone-shinning-through-the-pain-cropped-tee-pink-product',
                name: 'GIRL ALONE — SHINNING THROUGH THE PAIN CROPPED TEE (PINK)',
                slug: 'girl-alone-shinning-through-the-pain-cropped-tee-pink',
                price: '$65.00',
                collection: 'Shinning Through The Pain 3.0 — Women’s Collection',
                description: 'A fitted cropped tee created for the women who kept their shine through everything meant to break them. Featuring the signature pink Shinning Through The Pain graphic across the front and GIRL ALONE embroidered logo on the back.\n\nBold, feminine, and made to turn pain into something worth wearing.',
                details: [
                    'Women’s cropped fit',
                    'Short sleeves',
                    'Pink Shinning Through The Pain front graphic',
                    'GIRL ALONE embroidered logo on back',
                    'Available in Black and White',
                    'Sizes Small – 2X-Large',
                    'Limited release',
                    'No restock',
                ],
                tagline: 'BEAUTIFUL THINGS CAN COME FROM UGLY PAIN. ⚔️',
                discountPrices: [
                    { label: '20% Members Discount', price: '$52.00' },
                    { label: '10% Public Discount', price: '$58.50' },
                ],
                images: ['7981', '7984', '7992'].map(croppedTeeImage),
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'], featuredImage: croppedTeeImage('7981') },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                ],
            },
        ],
    },
    {
        id: 'girl-alone-pink-camouflage-eyes-raglan-crop-tee',
        name: 'GIRL ALONE — PINK CAMOUFLAGE EYES RAGLAN CROP TEE',
        slug: 'girl-alone-pink-camouflage-eyes-raglan-crop-tee',
        description: 'Shinning Through The Pain 3.0 — Women’s Collection',
        featuredImage: raglanImage('9049'),
        hoverImage: raglanImage('0540'),
        products: [
            {
                id: 'girl-alone-pink-camouflage-eyes-raglan-crop-tee-product',
                name: 'GIRL ALONE — PINK CAMOUFLAGE EYES RAGLAN CROP TEE',
                slug: 'girl-alone-pink-camouflage-eyes-raglan-crop-tee',
                price: '$70.00',
                collection: 'Shinning Through The Pain 3.0 — Women’s Collection',
                description: 'A premium women’s raglan crop tee featuring the signature GIRL ALONE eye graphic reworked in pink camouflage. Designed with contrasting sleeves, a fitted cropped silhouette, and GIRL ALONE embroidery on the back.\n\nA feminine statement piece built around the Shinning Through The Pain story — what she went through left scars, but it never took her shine.',
                details: [
                    'Premium raglan crop tee',
                    'Fitted women’s silhouette',
                    'Contrast sleeves',
                    'Pink camouflage GIRL ALONE eyes graphic',
                    'GIRL ALONE embroidered logo on back',
                    'Available in Pink, Black & Red',
                    'Sizes Small – 2X-Large',
                    'Limited release',
                    'No restock',
                ],
                tagline: 'DON’T LET THE PINK FOOL YOU. THIS CHAPTER STILL GOT SCARS. ⚔️',
                discountPrices: [
                    { label: '20% Members Discount', price: '$56.00' },
                    { label: '10% Public Discount', price: '$63.00' },
                ],
                images: ['9049', '8915', '9884', '0540'].map(raglanImage),
                colors: [
                    { name: 'Pink', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'], featuredImage: raglanImage('9049') },
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                ],
            },
        ],
    },
    {
        id: 'girl-alone-shinning-through-the-pain-sunglasses-grills-graphic-tee',
        name: 'GIRL ALONE — SHINNING THROUGH THE PAIN SUNGLASSES & GRILLS GRAPHIC TEE',
        slug: 'girl-alone-shinning-through-the-pain-sunglasses-grills-graphic-tee',
        description: 'Shinning Through The Pain 3.0 — Women’s Collection',
        featuredImage: sunglassesTeeImage('5762'),
        hoverImage: sunglassesTeeImage('9085'),
        products: [
            {
                id: 'girl-alone-shinning-through-the-pain-sunglasses-grills-graphic-tee-product',
                name: 'GIRL ALONE — SHINNING THROUGH THE PAIN SUNGLASSES & GRILLS GRAPHIC TEE',
                slug: 'girl-alone-shinning-through-the-pain-sunglasses-grills-graphic-tee',
                price: '$75.00',
                collection: 'Shinning Through The Pain 3.0 — Women’s Collection',
                description: 'A statement graphic tee built around two sides of the GIRL ALONE identity. Featuring original artwork of a girl wearing layered sunglasses and GIRL ALONE grills, with different head artwork displayed across the front and back.\n\nDesigned to represent confidence after pain — she didn’t hide what she went through. She turned it into part of her identity.',
                details: [
                    'Women’s graphic tee',
                    'Front and back artwork',
                    'Layered sunglasses graphic',
                    'GIRL ALONE grills detail',
                    'Different head graphic on front and back',
                    'Available in Black & White',
                    'Sizes Small – 2X-Large',
                    'Limited release',
                    'No restock',
                ],
                tagline: 'SHE GOT SCARS YOU CAN’T SEE. BUT A SHINE YOU CAN’T MISS. ⚔️',
                discountPrices: [
                    { label: '20% Members Discount', price: '$60.00' },
                    { label: '10% Public Discount', price: '$67.50' },
                ],
                images: ['5762', '9085', '9429', '5351'].map(sunglassesTeeImage),
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'], featuredImage: sunglassesTeeImage('5762') },
                ],
            },
        ],
    },
];

export const getAllProducts = () => {
    return collections.flatMap((c) => c.products);
};

export const getCollectionBySlug = (slug: string) => {
    return collections.find((c) => c.slug === slug);
};

export const getProductBySlug = (slug: string) => {
    return getAllProducts().find((p) => p.slug === slug);
};
