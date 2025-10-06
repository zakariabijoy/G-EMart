import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Product } from './shared/models/product';
import { Shop } from './core/services/shop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('client');
  products: Product[] = [];
  private shopService = inject(Shop);

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: response =>  this.products = response.data,
      error: error =>  console.error(error)
    });
  }
}
