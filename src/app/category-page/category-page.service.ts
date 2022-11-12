import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { ProductFilterResult } from '../model/product-filter-result.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageService {

  constructor(private http: HttpClient,
    private apiConstants: ApiConstants) { }

  getCategoryResult(categoryCode: string, brands: string[], minPrice: number, maxPrice: number, isOnSale: boolean, sort: string): Observable<Product[]> {
    let httpParams = new HttpParams()
      .set('brand', !brands ? '' : brands.join(','))
      .set('minPrice', !minPrice ? '' : minPrice.toString())
      .set('maxPrice', !maxPrice ? '' : maxPrice.toString())
      .set('isOnSale', !isOnSale ? '' : isOnSale.toString())
      .set('sort', !sort ? '' : sort);
    return this.http.get<Product[]>(this.apiConstants.getCategory(categoryCode), { params: httpParams });
  }

  getFiltersResult(categoryCode: string): Observable<ProductFilterResult> {
    return this.http.get<ProductFilterResult>(this.apiConstants.getCategoryFilters(categoryCode));
  }
}
