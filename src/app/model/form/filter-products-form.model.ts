export class FilterProductsForm {
    sort?: string;
    brands?: string[] = [];
    isOnSale?: boolean;
    minPrice?: number;
    maxPrice?: number;
}