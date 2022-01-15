import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
