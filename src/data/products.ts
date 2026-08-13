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
    earlyAccessPrice?: string;
    slug: string;
    images: string[];
    description?: string;
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

export const collections: Collection[] = [
    {
        id: 'shining-collection-2026',
        name: 'Shining Collection 2026',
        slug: 'shining-collection-2026',
        featuredImage: '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_7053.JPEG',
        hoverImage: '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_0991.JPEG',
        products: [
            {
                id: 'shining-face-tee',
                name: 'Shining Face Tee',
                slug: 'shining-face-tee',
                price: '$85.00',
                earlyAccessPrice: '$76.50',
                description: 'Premium heavyweight boxy tee. Oversized / boxy fit.',
                images: [
                    '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_7053.JPEG',
                    '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_0991.JPEG',
                    '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_2991.JPEG',
                    '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_3078.JPEG',
                    '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_7024.JPEG',
                    '/assets/Shining%20collection%202026/ShiningfaceTeeIMG_7577.JPEG',
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] }
                ]
            }
        ]
    },
    {
        id: 'shining-grills-tee',
        name: 'Shining Grills Tee',
        slug: 'shining-grills-tee',
        featuredImage: '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_0443.JPEG',
        hoverImage: '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_4495.JPEG',
        products: [
            {
                id: 'shining-grills-tee-product',
                name: 'Shining Grills Tee',
                slug: 'shining-grills-tee',
                price: '$85.00',
                earlyAccessPrice: '$76.50',
                description: 'Premium heavyweight boxy tee. Oversized / boxy fit. Large front & back graphic.',
                images: [
                    '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_0061.JPEG',
                    '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_0443.JPEG',
                    '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_1521.JPEG',
                    '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_2321.JPEG',
                    '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_4495.JPEG',
                    '/assets/Shining%20collection%202026/ShiningGrillsTeeIMG_6227.JPEG',
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] }
                ]
            }
        ]
    },
    {
        id: 'shining-through-the-pain-tee',
        name: 'Shining Through The Pain Tee',
        slug: 'shining-through-the-pain-tee',
        featuredImage: '/assets/Shining%20collection%202026/STTPTeesIMG_1259.JPEG',
        hoverImage: '/assets/Shining%20collection%202026/STTPTeesIMG_9593.JPEG',
        products: [
            {
                id: 'shining-through-the-pain-tee-product',
                name: 'Shining Through The Pain Tee',
                slug: 'shining-through-the-pain-tee',
                price: '$70.00',
                earlyAccessPrice: '$63.00',
                description: 'Premium heavyweight boxy tee. Oversized / boxy fit. Large front graphic.',
                images: [
                    '/assets/Shining%20collection%202026/STTPTeesIMG_1259.JPEG',
                    '/assets/Shining%20collection%202026/STTPTeesIMG_9593.JPEG',
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] }
                ]
            }
        ]
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
