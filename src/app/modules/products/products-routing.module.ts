import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddProductsComponent } from 'src/app/components/products/admin-add-products/admin-add-products.component';
import { CartComponent } from 'src/app/components/products/cart/cart.component';
import { ProductsPageComponent } from 'src/app/components/products/products-page/products-page.component';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { AuthGuard } from 'src/app/router-guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        redirectTo: '/products/shopping',
        pathMatch: 'full'
      },
      {
        path: 'shopping',
        component: ProductsPageComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'add-products-to-the-cart',
        component: AdminAddProductsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
