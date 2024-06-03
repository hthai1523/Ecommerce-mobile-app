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

export interface Category {
    cateID: number;
    name: string;
    thumb: string;
    status: boolean;
    createdBy: number;
    createdDate: Date;
    updateBy: number | null;
    updateDate: Date | null;
}