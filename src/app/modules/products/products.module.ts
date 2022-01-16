import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from 'src/app/store/products/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductsModule { }
