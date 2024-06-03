export interface Product {
    productID: number;
    title: string;
    price: number;
    quantity: number;
    cateID: number;
    supplierID: number | null;
    rate: number;
    dateReleases: Date | null;
    count: number;
    discount: number;
    image: string;
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

export interface ProductWithSizeColor extends ProductDetail {
    selectedSize: string;
    selectedColor: string
}