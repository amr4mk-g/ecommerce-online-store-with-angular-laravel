import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  loading = true
  orders: Order[] = []
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.getOrders()
  }
  
  getOrders() {
    this.service.getOrders().subscribe((res: any) => {
      this.orders = res.orders;
      this.loading = false
    }, err => { this.showToast('Something went wrong, try again!'); })
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
