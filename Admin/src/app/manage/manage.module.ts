import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/users/users.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    OrdersComponent, ProductsComponent, AddProductComponent,
    ReportsComponent, UsersComponent, ConfirmDeleteComponent,
    ViewOrderComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule, ReactiveFormsModule,
    BrowserModule, FormsModule, HttpClientModule,

    MatFormFieldModule, MatSelectModule, MatGridListModule, MatCardModule,
    MatInputModule, MatIconModule, MatButtonModule, MatDialogModule,
    MatDatepickerModule, MatNativeDateModule
  ] 
})
export class ManageModule {}
