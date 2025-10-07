import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class Shop {
  baseurl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getProducts(brands?: string[], types?: string[]) {
    let params = new HttpParams();
    if (brands && brands.length > 0) params = params.append('brands', brands.join(','));
    if (types && types.length > 0) params = params.append('types', types.join(','));
    params = params.append('pageSize', '20');
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
