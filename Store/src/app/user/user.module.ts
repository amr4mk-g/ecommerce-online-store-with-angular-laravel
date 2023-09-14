import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CheckoutOrderComponent } from './components/checkout-order/checkout-order.component';

@NgModule({
  declarations: [
    ProfileComponent, OrdersComponent, CheckoutOrderComponent,
    CartComponent, ConfirmDeleteComponent 
  ],
  imports: [
    CommonModule, SharedModule, FormsModule,
    MatDialogModule, MatButtonModule, MatCardModule
  ]
})
export class UserModule { }
