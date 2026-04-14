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
        id: 'girl-jacket',
        name: 'Girl Jacket',
        slug: 'girl-jacket',
        featuredImage: '/assets/girljacketcol2IMG_3365.JPEG',
        products: [
            {
                id: 'girl-jacket-product',
                name: 'Girl Jacket',
                slug: 'girl-jacket',
                price: '$100',
                images: [
                    '/assets/girljacketcol2IMG_3365.JPEG',
                    '/assets/girljacketcol2IMG_3341.JPEG',
                    '/assets/girljacketcol2IMG_3377.JPEG'
                ],
                colors: [
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Black', sizes: ['Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'black-crop-top',
        name: 'Black Crop Top',
        slug: 'black-crop-top',
        featuredImage: '/assets/croptopcol5IMG_3406.JPEG',
        products: [
            {
                id: 'black-crop-top-product',
                name: 'Black Crop Top',
                slug: 'black-crop-top',
                price: '$60',
                images: [
                    '/assets/croptopcol5IMG_3406.JPEG',
                    '/assets/croptopcol5IMG_3443.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'white-crop-top',
        name: 'White Crop Top',
        slug: 'white-crop-top',
        featuredImage: '/assets/croptopcol4IMG_3243.JPEG',
        products: [
            {
                id: 'white-crop-top-product',
                name: 'White Crop Top',
                slug: 'white-crop-top',
                price: '$60',
                images: [
                    '/assets/croptopcol4IMG_3243.JPEG',
                    '/assets/croptopcol4IMG_3250.JPEG'
                ],
                colors: [
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'jean-jacket',
        name: 'Jean Jacket',
        slug: 'jean-jacket',
        featuredImage: '/assets/JeanjacketKayMarch14th_Tiff%20Images-4.JPEG',
        products: [
            {
                id: 'men-jean-jacket',
                name: 'Jean Jacket',
                slug: 'jean-jacket',
                price: '$200',
                images: [
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-4.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-2.JPEG',
                    '/assets/JeanjacketKayMarch14th_Tiff%20Images-3.JPEG',
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
                ],
                isSoldOut: true
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
                price: '$130',
                images: [
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images.JPEG',
                    '/assets/TracksuitKayMarch14th_2ndTiff%20Images-2.JPEG',
                    '/assets/redtwotoneKay%20March%2021st%20Final%20Images-2.JPEG',
                    '/assets/redtwotoneKay%20March%2021st%20Final%20Images-3.JPEG',
                    '/assets/redtwotoneJamal%20Stewart_KayBoyAlone_April4th-15.JPEG',
                    '/assets/redtwotoneJamal%20Stewart_KayBoyAlone_April4th-16.JPEG'
                ],
                colors: [
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL'], featuredImage: '/assets/redtwotoneJamal%20Stewart_KayBoyAlone_April4th-15.JPEG' },
                    { name: 'Pink', sizes: ['Small', 'Medium', 'Large', '2XL'] }
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
                price: '$60',
                images: [
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-13.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-14.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-15.JPEG',
                    '/assets/SweatshirtKayMarch14th_2ndTiff%20Images-17.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL'] },
                    { name: 'Cream', sizes: ['Small', 'Medium', 'Large', 'XL'] }
                ]
            }
        ]
    },
    {
        id: 'hoodie',
        name: 'Sun-dried Hoodie',
        slug: 'hoodie',
        featuredImage: '/assets/SundriedhoodieKay%20March%2021st%20Final%20Images-6.JPEG',
        products: [
            {
                id: 'men-hoodie',
                name: 'Sun-dried Hoodie',
                slug: 'hoodie',
                price: '$100',
                images: [
                    '/assets/SundriedhoodieKay%20March%2021st%20Final%20Images-6.JPEG',
                    '/assets/navysundried.JPEG'
                ],
                colors: [
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'], featuredImage: '/assets/SundriedhoodieKay%20March%2021st%20Final%20Images-6.JPEG' },
                    { name: 'Navy', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL'], featuredImage: '/assets/navysundried.JPEG' }
                ]
            }
        ]
    },
    {
        id: 'boy-alone-hoodie',
        name: 'Boy Alone Hoodies',
        slug: 'boy-alone-hoodie',
        featuredImage: '/assets/sundriedhoodie.JPEG',
        products: [
            {
                id: 'boy-alone-hoodie-product',
                name: 'Boy Alone Hoodies',
                slug: 'boy-alone-hoodie',
                price: '$70',
                images: [
                    '/assets/sundriedhoodie.JPEG',
                    '/assets/sundriedhoodieJamal Stewart_KayBoyAlone_April4th-2.JPEG',
                    '/assets/sundriedhoodieJamal Stewart_KayBoyAlone_April4th-4.JPEG'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'] },
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'] },
                    { name: 'Green', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'] },
                    { name: 'White', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'] }
                ]
            }
        ]
    },
    {
        id: 'crewneck',
        name: 'Sun-dried Crewneck',
        slug: 'crewneck',
        featuredImage: '/assets/sundriedblacksweatshirtKay%20March%2021st%20Final%20Images-8.JPEG',
        products: [
            {
                id: 'men-crewneck',
                name: 'Sun-dried Crewneck',
                slug: 'crewneck',
                price: '$100',
                images: [
                    '/assets/sundriedblacksweatshirtKay%20March%2021st%20Final%20Images-8.JPEG',
                    '/assets/sundriedblacksweatshirtKay%20March%2021st%20Final%20Images-9.JPEG',
                    '/assets/sundriedblacksweatshirtKay%20March%2021st%20Final%20Images-10.JPEG',
                    '/assets/crew%20neckvintagenavy.jpeg'
                ],
                colors: [
                    { name: 'Black', sizes: ['Small', 'Medium', 'Large', 'XL'], featuredImage: '/assets/sundriedblacksweatshirtKay%20March%2021st%20Final%20Images-8.JPEG' },
                    { name: 'Red', sizes: ['Small', 'Medium', 'Large', 'XL'], featuredImage: '/assets/sundriedblacksweatshirtKay%20March%2021st%20Final%20Images-10.JPEG' },
                    { name: 'Vintage Navy', sizes: ['Small', 'Medium', 'Large', 'XL', '2XL'], featuredImage: '/assets/crew%20neckvintagenavy.jpeg' }
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
