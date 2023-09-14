import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './manage/components/orders/orders.component';
import { ProductsComponent } from './manage/components/products/products.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { AuthGuard } from './auth/services/auth.guard';
import { ReportsComponent } from './manage/components/reports/reports.component';
import { UsersComponent } from './manage/components/users/users.component';

const routes: Routes = [
  {path: 'dashboard', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  
  {path: 'signin', component: SignInComponent},
  {path: '**', redirectTo: 'reports', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
