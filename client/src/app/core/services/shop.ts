import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class Shop {
  baseurl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brands.length > 0) params = params.append('brands', shopParams.brands.join(','));
    if (shopParams.types.length > 0) params = params.append('types', shopParams.types.join(','));
    if (shopParams.sort) params = params.append('sort', shopParams.sort);
    if (shopParams.search) params = params.append('search', shopParams.search);
    if (shopParams.pageNumber) params = params.append('pageNumber', shopParams.pageNumber);
    if (shopParams.pageSize) params = params.append('pageSize', shopParams.pageSize);
    return this.http.get<Pagination<Product>>(this.baseurl + 'products', { params });
  }

  getBrands() {
    if(this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseurl + 'products/brands').subscribe({
      next: response => this.brands = response,
      error: error => console.log(error)
    });
  }

  getTypes() {
    if(this.types.length > 0) return;
    return this.http.get<string[]>(this.baseurl + 'products/types').subscribe({
      next: response => this.types = response,
      error: error => console.log(error)
    });
  }
}
