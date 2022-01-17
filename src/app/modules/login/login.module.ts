import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from 'src/app/store/products/effects';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class LoginModule { }
