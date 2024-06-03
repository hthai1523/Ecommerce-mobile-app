export interface Product {
    productID: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating
}

export interface Rating {
    rate: number;
    count: number;
}

export interface ProductDetail {
    productID: number;
    title: string;
    colors: string[];
    description: string;
    images: string[];
    sizes: string[];
    price: number;
    discount: number;
}

export interface ProductWithSizeColor extends Product {
    size: string;
    color: string
}