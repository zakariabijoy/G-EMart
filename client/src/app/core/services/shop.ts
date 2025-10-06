import { HttpClient } from '@angular/common/http';
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

  getProducts() {
    return this.http.get<Pagination<Product>>(this.baseurl + 'products?pageSize=20')
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
