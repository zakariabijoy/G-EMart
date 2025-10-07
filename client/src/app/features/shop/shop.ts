import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Shop as ShopService}  from '../../core/services/shop';
import { ProductItem } from './product-item/product-item';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialog } from './filter-dialog/filter-dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItem,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger
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
  selectedSort = signal<string>('name');
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' }
  ];

  ngOnInit(): void {
    this.initializeShop();
  } 

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.selectedBrands(), this.selectedTypes(), this.selectedSort()).subscribe({
      next: response => this.products.set(response.data),
      error: error => console.error(error)
    });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.selectedSort.set(selectedOption.value);
      this.getProducts();
    }
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
          this.getProducts();
        }
      },
      error: error => console.error(error)
    });
  }
}
