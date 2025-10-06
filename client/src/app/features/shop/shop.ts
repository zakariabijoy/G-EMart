import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Shop as ShopService}  from '../../core/services/shop';
import { ProductItem } from './product-item/product-item';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItem
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop implements OnInit {
  products = signal<Product[]>([]);
  private shopService = inject(ShopService);

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: response =>  this.products.set(response.data),
      error: error =>  console.error(error)
    });
  } 

}
