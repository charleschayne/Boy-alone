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
        id: 'shining-through-the-pain-boxy-tee',
        name: 'BOY ALONE — SHINING THROUGH THE PAIN BOXY TEE',
        slug: 'shining-through-the-pain-boxy-tee',
        featuredImage: '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6681.JPEG',
        hoverImage: '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6731.JPEG',
        products: [
            {
                id: 'shining-through-the-pain-boxy-tee-product',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN BOXY TEE',
                slug: 'shining-through-the-pain-boxy-tee',
                price: '$75.00',
                description: 'Premium heavyweight boxy tee. Oversized / boxy fit.',
                images: [
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6681.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6731.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6754.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6778.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINBOXYTEEIMG_6786.JPEG',
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] }
                ]
            }
        ]
    },
    {
        id: 'shining-through-the-pain-striped-polo',
        name: 'BOY ALONE — SHINING THROUGH THE PAIN STRIPED POLO',
        slug: 'shining-through-the-pain-striped-polo',
        featuredImage: '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_6990.JPEG',
        hoverImage: '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7004.JPEG',
        products: [
            {
                id: 'shining-through-the-pain-striped-polo-product',
                name: 'BOY ALONE — SHINING THROUGH THE PAIN STRIPED POLO',
                slug: 'shining-through-the-pain-striped-polo',
                price: '$100.00',
                description: 'Premium short-sleeve striped polo. Relaxed fit. All-over SHINING THROUGH THE PAIN artwork.',
                images: [
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_6990.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7004.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7071.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7086.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7106.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7120.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGTHROUGHTHEPAINSTRIPEDPOLOIMG_7147.JPEG',
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large'] },
                    { name: 'Red', sizes: ['Small'] },
                    { name: 'Pink', sizes: ['Small', 'Medium'] },
                    { name: 'Navy', sizes: ['Small'] }
                ]
            }
        ]
    },
    {
        id: 'shining-face-skater-tee',
        name: 'BOY ALONE — SHINING FACE SKATER TEE',
        slug: 'shining-face-skater-tee',
        featuredImage: '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6799.JPEG',
        hoverImage: '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6807.JPEG',
        products: [
            {
                id: 'shining-face-skater-tee-product',
                name: 'BOY ALONE — SHINING FACE SKATER TEE',
                slug: 'shining-face-skater-tee',
                price: '$75.00',
                description: 'Premium heavyweight skater tee. Oversized / relaxed fit. Layered long-sleeve look. Oversized SHINING FACE graphic.',
                images: [
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6799.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6807.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6813.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6840.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6887.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6918.JPEG',
                    '/assets/Shinning%20Collection%202%20/SHININGFACESKATERTEEIMG_6962.JPEG',
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'X-Large', '2X-Large'] },
                    { name: 'Off-White', sizes: ['Small', 'Large', 'X-Large'] },
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'X-Large'] }
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
