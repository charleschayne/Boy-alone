export interface ProductColor {
    name: string;
    hex?: string;
    sizes: string[];
}

export interface Product {
    id: string;
    name: string;
    price: string;
    slug: string;
    images: string[];
    description?: string;
    colors: ProductColor[];
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
        id: 'jackets',
        name: 'Jackets',
        slug: 'jackets',
        featuredImage: '/assets/col1IMG_4588.JPEG',
        products: [
            {
                id: 'girl-jackets',
                name: 'Jackets',
                slug: 'jackets',
                price: '$100',
                images: [
                    '/assets/col1IMG_4588.JPEG',
                    '/assets/col1IMG_4589.JPEG',
                    '/assets/col1IMG_4595.JPEG',
                    '/assets/col1IMG_4598.JPEG'
                ],
                colors: [
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Black', sizes: ['Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'crop-top',
        name: 'Crop Top',
        slug: 'crop-top',
        featuredImage: '/assets/col2IMG_3341.JPEG',
        products: [
            {
                id: 'girl-crop-top',
                name: 'Crop Top',
                slug: 'crop-top',
                price: '$40',
                images: [
                    '/assets/col2IMG_3341.JPEG',
                    '/assets/col2IMG_3365.JPEG',
                    '/assets/col2IMG_3377.JPEG'
                ],
                colors: [
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'jean-jacket',
        name: 'Jean Jacket',
        slug: 'jean-jacket',
        featuredImage: '/assets/JeanjacketKayMarch14th_Tiff%20Images.JPEG',
        products: [
            {
                id: 'men-jean-jacket',
                name: 'Jean Jacket',
                slug: 'jean-jacket',
                price: '$150',
                images: [
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-2.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-3.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-4.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-5.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-6.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-7.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-8.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-9.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-14.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Medium', 'Large', 'XL'] },
                    { name: 'Light Blue', sizes: ['Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'denim-jeans',
        name: 'Denim Jeans',
        slug: 'denim-jeans',
        featuredImage: '/assets/col3IMG_3129.JPEG',
        products: [
            {
                id: 'men-denim-jeans',
                name: 'Denim Jeans',
                slug: 'denim-jeans',
                price: '$50',
                images: [
                    '/assets/col3IMG_3129.JPEG',
                    '/assets/col3IMG_3135.JPEG',
                    '/assets/col3IMG_3137.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['30', '32', '34', '38'] },
                    { name: 'Blue', sizes: ['30', '32', '34', '38'] }
                ]
            }
        ]
    },
    {
        id: 'track-suit',
        name: 'Two Tone Track Suit',
        slug: 'track-suit',
        featuredImage: '/assets/TracksuitKayMarch14th_2ndTiff%20Images.JPEG',
        products: [
            {
                id: 'men-track-suit',
                name: 'Two Tone Track Suit',
                slug: 'track-suit',
                price: '$80',
                images: [
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-2.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-3.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-4.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-5.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-6.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-7.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-8.JPEG'
                ],
                colors: [
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Pink', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL'] }
                ]
            }
        ]
    },
    {
        id: 'sweatshirt',
        name: 'Sweatshirt',
        slug: 'sweatshirt',
        featuredImage: '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-13.JPEG',
        products: [
            {
                id: 'men-sweatshirt',
                name: 'Sweatshirt',
                slug: 'sweatshirt',
                price: '$50',
                images: [
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-13.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-14.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-15.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-17.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-18.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-20.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-21.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-24.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-25.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-26.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Cream', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Grey', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Brown', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'hoodie',
        name: 'Sun-dried Hoodie',
        slug: 'hoodie',
        featuredImage: '/assets/col4IMG_3243.JPEG',
        products: [
            {
                id: 'men-hoodie',
                name: 'Sun-dried Hoodie',
                slug: 'hoodie',
                price: '$80',
                images: [
                    '/assets/col4IMG_3243.JPEG',
                    '/assets/col4IMG_3250.JPEG',
                    '/assets/col4IMG_3264.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL'] },
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'crewneck',
        name: 'Sun-dried Crewneck',
        slug: 'crewneck',
        featuredImage: '/assets/col5IMG_3406.JPEG',
        products: [
            {
                id: 'men-crewneck',
                name: 'Sun-dried Crewneck',
                slug: 'crewneck',
                price: '$80',
                images: [
                    '/assets/col5IMG_3406.JPEG',
                    '/assets/col5IMG_3443.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Collection 002',
        slug: 'collection-002',
        featuredImage: '/assets/col2IMG_3341.JPEG',
        hoverImage: '/assets/col2IMG_3365.JPEG',
        products: []
    },
    {
        id: '4',
        name: 'Collection 004',
        slug: 'collection-004',
        featuredImage: '/assets/col4IMG_3243.JPEG',
        hoverImage: '/assets/col4IMG_3250.JPEG',
        products: []
    },
    {
        id: '5',
        name: 'Collection 005',
        slug: 'collection-005',
        featuredImage: '/assets/col5IMG_3406.JPEG',
        hoverImage: '/assets/col5IMG_3443.JPEG',
        products: []
    },
    {
        id: '6',
        name: 'Collection 006',
        slug: 'collection-006',
        featuredImage: '/assets/col6IMG_2015.JPEG',
        hoverImage: '/assets/col6IMG_2068.JPEG',
        products: []
    }
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
