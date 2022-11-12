import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFilterResult } from '../model/product-filter-result.model';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterProductsForm } from '../model/form/filter-products-form.model';
import { CategoryPageService } from '../category-page/category-page.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() productSearchResult$: Observable<Product[]>;
  @Input() filtersResult$: Observable<ProductFilterResult>;
  @Input() resultType: string;
  @Input() searchQuery: string;

  faCartPlus = faCartPlus;
  filterProductsFormModel: FilterProductsForm;

  constructor(private categoryPageService: CategoryPageService) { }

  ngOnInit(): void {
    this.filterProductsFormModel = new FilterProductsForm();
  }

  filterResults(): void {
    this.productSearchResult$ = this.categoryPageService.getCategoryResult(this.searchQuery, this.filterProductsFormModel.brands,
      this.filterProductsFormModel.minPrice, this.filterProductsFormModel.maxPrice,
      this.filterProductsFormModel.isOnSale, this.filterProductsFormModel.sort);
  }

  handleClickedBrands(brand: string, event: any): void {
    if (event.target.checked === true) {
      this.filterProductsFormModel.brands.push(brand);
    } else {
      this.filterProductsFormModel.brands.forEach((value, index) => {
        if (value === brand) this.filterProductsFormModel.brands.splice(index, 1);
      });
    }
  }
}
