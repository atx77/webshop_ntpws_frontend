import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductPageService } from './product-page.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product>;
  productCode: string;

  faCartPlus = faCartPlus;

  constructor(private route: ActivatedRoute,
    private productPageService: ProductPageService) { }

  ngOnInit(): void {
    this.productCode = this.route.snapshot.paramMap.get('code');
    this.getProduct(this.productCode);
  }

  getProduct(code: string) {
    this.product$ = this.productPageService.getProduct(code);
  }
}
