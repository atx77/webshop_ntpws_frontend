import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiConstants {

    API_URL_HOST = 'http://localhost:8080/api';

    constructor() { }

    login(): string {
        return this.API_URL_HOST + '/user/authenticate';
    }

    register(): string {
        return this.API_URL_HOST + '/user/register';
    }

    getLoggedUser(): string {
        return this.API_URL_HOST + '/user';
    }

    getCategory(categoryCode: string): string {
        return this.API_URL_HOST + '/category/' + categoryCode
    }

    getCategoryFilters(categoryCode: string): string {
        return this.API_URL_HOST + '/category/' + categoryCode + '/all-filters'
    }

    getCategoryTree(): string {
        return this.API_URL_HOST + '/category/tree';
    }

    search(text: string): string {
        return this.API_URL_HOST + '/search/' + text;
    }

    getSearchFilters(categoryCode: string): string {
        return this.API_URL_HOST + '/search/' + categoryCode + '/all-filters'
    }

    getProduct(productCode: string) {
        return this.API_URL_HOST + '/product/' + productCode;
    }
}