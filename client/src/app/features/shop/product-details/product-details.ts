import { Component, inject, OnInit, signal } from '@angular/core';
import { Shop } from '../../../core/services/shop';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  private shopService = inject(Shop);
  private activatedRoute = inject(ActivatedRoute);
  product = signal<Product | null>(null);
  

  ngOnInit() : void {
    this.loadProduct();
  }

  private loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    this.shopService.getProduct(+id).subscribe({
      next: product => this.product.set(product),
      error: error => console.log(error)
    });
  }
}
