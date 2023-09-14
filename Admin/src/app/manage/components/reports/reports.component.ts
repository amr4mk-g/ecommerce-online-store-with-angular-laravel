import { Component, OnInit } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { Report } from '../../models/report';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
  loading = true
  toastShow = false
  toastMessage = ''
  timer: any

  usersChart: any
  productsChart: any
  ordersChart: any

  data: Report = {products_in: 0, products_out: 0,
    products_soon: 0, users_in: 0, users_out: 0,
    users_admin: 0, orders_pending: 0, orders_shipped: 0,
    orders_delivered: 0, orders_canceled: 0};

  constructor(private service: ManageService) {}

  ngOnInit(): void {
    this.viewReport()
  }

  viewReport() {
    this.service.getReport().subscribe((res: any) => {
      this.data = res
      this.createChart()
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

  createChart(){
    this.usersChart = new Chart("MyChart1", {type: 'pie',
      data: {labels: ['Active','Disabled','Admin'], 
      datasets: [{ label: 'Users',
      data: [this.data.users_in, this.data.users_out, this.data.users_admin],
      backgroundColor: ['red','green','blue'],
      hoverOffset: 4
    }]}, options: {aspectRatio:2.5} });

    this.productsChart = new Chart("MyChart2", {type: 'pie',
      data: {labels: ['In Stock','Out Of Stock','Soon'], 
      datasets: [{ label: 'Products',
      data: [this.data.products_in, this.data.products_out, this.data.products_soon],
      backgroundColor: ['red','green','blue'],
      hoverOffset: 4
    }]}, options: {aspectRatio:2.5} });

    this.ordersChart = new Chart("MyChart3", {type: 'pie',
      data: {labels: ['Pending','Shipped','Delivered', 'Canceled'], 
      datasets: [{ label: 'Orders',
      data: [this.data.orders_pending, this.data.orders_shipped, 
        this.data.orders_delivered, this.data.orders_canceled],
      backgroundColor: ['red','green','blue','orange'],
      hoverOffset: 4
    }]}, options: {aspectRatio:2.5} });
  }
}
