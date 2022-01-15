import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html'
})
export class ProductsItemComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
      this.productService.getAllProductsData().subscribe(data=>console.log('all products data ---->', data))
  }

}
