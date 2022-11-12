import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductFilterResult } from '../model/product-filter-result.model';
import { Product } from '../model/product.model';
import { CategoryPageService } from './category-page.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categoryCode: string;
  categoryProductResult$: Observable<Product[]>;
  filtersResult$: Observable<ProductFilterResult>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryPageService: CategoryPageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.categoryCode = this.route.snapshot.paramMap.get('code');
    this.getCategoryResult(this.categoryCode);
    this.getFiltersResult(this.categoryCode);
  }

  getCategoryResult(categoryCode: string) {
    this.categoryProductResult$ = this.categoryPageService.getCategoryResult(categoryCode, null, null, null, null, null);
  }

  getFiltersResult(categoryCode: string) {
    this.filtersResult$ = this.categoryPageService.getFiltersResult(categoryCode);
  }
}
