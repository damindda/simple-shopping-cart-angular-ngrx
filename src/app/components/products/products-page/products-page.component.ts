import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
