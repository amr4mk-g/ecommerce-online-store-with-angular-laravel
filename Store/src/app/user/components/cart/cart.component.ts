import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Cart } from '../../models/cart';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { CheckoutOrderComponent } from '../checkout-order/checkout-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  loading = true
  items: Cart[] = []
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getItemsInCart()
  }

  getItemsInCart() {
    this.service.getCart().subscribe((res: any) => {
      this.items = res.items;
      this.loading = false
    }, err => { this.showToast('Something went wrong, try again!') })
  }

  updateQuantity(index: number, item: any) {
    this.loading = true 
    let data = {"index": index, "quantity": item.quantity}
    this.service.updateCart(data).subscribe((res: any) => {
      this.showToast(res.message)
    }, err => { this.showToast('Something went wrong, try again!') })
  }

  removeItem(index: number) {
    this.loading = true 
    let data = {"index": index}
    this.service.deleteItem(data).subscribe((res: any) => {
      this.showToast(res.message)
      this.getItemsInCart()
    }, err => { this.showToast('Something went wrong, try again!') })
  }

  placeOrder() {
    this.loading = true
    this.service.getUser().subscribe((res: any) => {
      if (!res.user.phone || !res.user.address)
        this.showToast('You must choose address and phone number on the profile page')
      else this.openModalCheckout({user: res.user, total: this.calculateTotal()})
    })
  }

  openModalCheckout(orderData: any) {
    this.loading = false
    let dialog = this.dialog.open(CheckoutOrderComponent, {width: '400px', 
      disableClose: true, data: {orderData}});
    dialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.placeOrder().subscribe((res: any) => {
          this.showToast(res.message)
          this.getItemsInCart()
        }, err => this.showToast('Something went wrong, try again!'))
      } 
    });
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => total + this.calculateSubtotal(item), 0);
  }

  calculateSubtotal(item: any): number {
    return item.product.price*item.quantity;
  }

  openModalDelete(index: number) {
    let dialog = this.dialog.open(ConfirmDeleteComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) this.removeItem(index)
    });
  }

  showToast(mess: string) {
    this.loading = false
    this.toastShow = true
    this.toastMessage = mess
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => { 
      this.toastShow = false 
      this.timer = null
    }, 2000);
  }
}
