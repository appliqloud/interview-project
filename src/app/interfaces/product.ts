export interface IProduct {
    isActive: boolean;
    id: string;
    price: string;
    translations: Array<{
        language: string;
        description: string;
    }>;
}