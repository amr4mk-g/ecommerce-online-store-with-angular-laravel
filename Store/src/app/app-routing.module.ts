import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { CartComponent } from './user/components/cart/cart.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { AuthGuard } from './auth/services/auth.guard';
import { ForgetComponent } from './auth/components/forget/forget.component';
import { ResetComponent } from './auth/components/reset/reset.component';
import { OrdersComponent } from './user/components/orders/orders.component';
import { ProfileComponent } from './user/components/profile/profile.component';

const routes: Routes = [
  {path: 'products', component: AllProductsComponent},

  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},

  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'forget', component: ForgetComponent},
  {path: 'reset/{id}', component: ResetComponent},

  {path: '**', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
