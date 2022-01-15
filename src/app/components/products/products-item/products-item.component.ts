import { Product } from './../../../models/shopping-cart';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html'
})
export class ProductsItemComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
     this.products$ = this.productService.getAllProductsData()
  }

}
