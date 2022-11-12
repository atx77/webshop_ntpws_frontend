import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductFilterResult } from '../model/product-filter-result.model';
import { Product } from '../model/product.model';
import { SearchPageService } from './search-page.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchText: string;
  searchProductResult$: Observable<Product[]>;
  filtersResult$: Observable<ProductFilterResult>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private searchPageService: SearchPageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.searchText = this.route.snapshot.paramMap.get('text');
    this.getCategoryResult(this.searchText);
    this.getFiltersResult(this.searchText);
  }

  getCategoryResult(searchText: string) {
    this.searchProductResult$ = this.searchPageService.getSearchResult(searchText, null, null, null, null, null);
  }

  getFiltersResult(searchText: string) {
    this.filtersResult$ = this.searchPageService.getFiltersResult(searchText);
  }
}
