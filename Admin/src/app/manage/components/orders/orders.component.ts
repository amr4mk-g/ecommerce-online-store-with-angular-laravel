import { Component, OnInit } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { Order } from '../../models/order';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  loading = true
  filteredOrders: Order[] = [];
  searchQuery: string = '';
  orders: Order[] = []
  toastShow = false
  toastMessage = ''
  timer: any
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private service: ManageService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.viewOrders()
  }

  viewOrders() {
    this.service.getAllOrders().subscribe((res: any) => {
      this.filteredOrders = res.orders
      this.orders = res.orders
      this.loading = false
    }, err => { this.showToast('Something went wrong, try again!'); })
  }

  openModalView(id: number) {
    this.loading = true
    let index = this.orders.findIndex(it => it.id == id);
    if (index == -1) this.showToast('Something went wrong, try again!');
    this.service.getOrderItems(id).subscribe((res: any) => {
      this.loading = false;
      this.dialog.open(ViewOrderComponent, {width: '700px', 
          data: {order: this.orders[index], items: res.items}});
    }, err => { this.showToast('Something went wrong, try again!'); })
  }

  onChange(event: any, id: number) {
    let st = event.value;
    this.loading = true
    this.service.changeOrder(id, st).subscribe((res: any) => {
      this.loading = false;
      this.showToast('Order updated successfully');
  }, err => { this.showToast('Something went wrong, try again!'); })
  }

  searchOrders() {
    this.filteredOrders = this.orders.filter(order =>
      order.order_number.toString().includes(this.searchQuery)
    );
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

  applyDateFilter() {
    let start = this.range.value.start
    let end = this.range.value.end
    if (start && end) {
      this.filteredOrders = this.orders.filter((order) => {
        let date = new Date(order.order_date);
        return date >= start! && date <= end!;
      });
    } else this.filteredOrders = this.orders;
  }
}