import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductFilterResult } from '../model/product-filter-result.model';
import { faCartPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FilterProductsForm } from '../model/form/filter-products-form.model';
import { CategoryPageService } from '../category-page/category-page.service';
import { Product } from '../model/product.model';
import { SearchPageService } from '../search-page/search-page.service';
import { CartService } from '../cart-page/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  @Input() productSearchResult$: Observable<Product[]>;
  @Input() filtersResult$: Observable<ProductFilterResult>;
  @Input() resultType: string;
  @Input() searchQuery: string;

  subscription: Subscription;
  faCartPlus = faCartPlus;
  faFilter = faFilter;
  filterProductsFormModel: FilterProductsForm;
  addedToCart: boolean;
  addedProductName: string;

  constructor(private categoryPageService: CategoryPageService,
    private searchPageService: SearchPageService,
    private cartService: CartService,
    private router: Router) { }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.filterProductsFormModel = new FilterProductsForm();
  }

  filterResults(): void {
    if (this.resultType === 'category') {
      this.productSearchResult$ = this.categoryPageService.getCategoryResult(this.searchQuery, this.filterProductsFormModel.brands,
        this.filterProductsFormModel.minPrice, this.filterProductsFormModel.maxPrice,
        this.filterProductsFormModel.isOnSale, this.filterProductsFormModel.sort);
    }

    if (this.resultType === 'search') {
      this.productSearchResult$ = this.searchPageService.getSearchResult(this.searchQuery, this.filterProductsFormModel.brands,
        this.filterProductsFormModel.minPrice, this.filterProductsFormModel.maxPrice,
        this.filterProductsFormModel.isOnSale, this.filterProductsFormModel.sort);
    }
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

  addToCart(productCode: string, productName: string) {
    this.addedProductName = productName;
    this.subscription = this.cartService.addProductToCart(productCode, 1)
    .subscribe(
      result => {
        this.addAlert(productName);
      },
      error => {
      this.router.navigate(['login'])
    });
  }

  addAlert(productName: string) {
    var alertHtml = '<div class="alert alert-dismissible alert-success" role="alert">&nbsp;Dodali ste proizvod \'' + productName + '\' u košaricu<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    var wrapper = document.getElementById('alert-message-wrapper');
    wrapper.insertAdjacentHTML('beforeend', alertHtml);
  }
}
