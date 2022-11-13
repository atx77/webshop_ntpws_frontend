import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../cart-page/cart.service';
import { Product } from '../model/product.model';
import { ProductPageService } from './product-page.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product$: Observable<Product>;
  productCode: string;
  subscription: Subscription;

  faCartPlus = faCartPlus;

  constructor(private route: ActivatedRoute,
    private productPageService: ProductPageService,
    private cartService: CartService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.productCode = this.route.snapshot.paramMap.get('code');
    this.getProduct(this.productCode);
  }

  getProduct(code: string) {
    this.product$ = this.productPageService.getProduct(code);
  }

  addToCart(productCode: string) {
    this.subscription = this.cartService.addProductToCart(productCode, 1).subscribe(() => {});
  }
}
