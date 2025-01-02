export interface Brands {
    brandId: number;
    name: string;
}

export interface ProductTypes {
    productTypeId: number;
    name: string;
}

export interface Product {                  
    name: string;  
    price: number;  
    description: string;
    brand: number;  
    producttype: number;
}