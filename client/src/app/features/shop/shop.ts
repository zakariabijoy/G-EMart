import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Shop as ShopService}  from '../../core/services/shop';
import { ProductItem } from './product-item/product-item';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialog } from './filter-dialog/filter-dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItem,
    MatButton,
    MatIcon
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  products = signal<Product[]>([]);
  selectedBrands = signal<string[]>([]);
  selectedTypes = signal<string[]>([]);

  ngOnInit(): void {
    this.initializeShop();
  } 

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.shopService.getProducts().subscribe({
      next: response =>  this.products.set(response.data),
      error: error =>  console.error(error)
    });
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FilterDialog, {
      minHeight: '500px',
      data: {
        selectedBrands: this.selectedBrands(),
        selectedTypes: this.selectedTypes()
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if(result) {
          this.selectedBrands.set(result.selectedBrands);
          this.selectedTypes.set(result.selectedTypes);
          this.shopService.getProducts(this.selectedBrands(), this.selectedTypes()).subscribe({
            next: response => this.products.set(response.data),
            error: error => console.error(error)
          });
        }
      },
      error: error => console.error(error)
    });
  }
}
