export interface Product {
    name: string;
    price: number;
    description: string;
    brandId: number;
    productTypeId: number;
    image?: File; // Assuming you want to upload an image file
  }
  