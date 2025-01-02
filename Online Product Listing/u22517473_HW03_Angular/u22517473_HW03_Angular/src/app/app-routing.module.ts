import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductsComponent } from './add-product/add-product.component';
import { ChartComponent } from './charts/chart/chart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: ProductListingComponent },
  { path: 'Addpro', component: AddProductsComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
