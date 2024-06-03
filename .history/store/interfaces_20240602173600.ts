interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
  
 export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
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
    count: number;
    rate: number;
}

export interface ProductWithSizeColor extends Product {
    selectedSize: string;
    selectedColor: string
}

export interface FullProduct extends Product, ProductDetail {}

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