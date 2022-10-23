export interface ProductInterface {
    id: number;
    name: string;
    image: string;
    rating: number;
    released: string;
    platforms: string;
    genres: string;
    price: number;
    count: number;
}

// Used by auto-swagger generator
export type Product = ProductInterface;
export type Products = ProductInterface[];
