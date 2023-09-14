import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.url+"products");
  }

  addProduct(data: Product) {
    return this.http.post(this.url+"product", data);
  }

  editProduct(id: number, data: Product) {
    return this.http.put(this.url+"product/"+id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.url+"product/"+id);
  }

  getAllUsers() {
    return this.http.get(this.url+"users");
  }

  getUser(id: number) {
    return this.http.get(this.url+"user/"+id);
  }

  changeUser(id: number) {
    return this.http.put(this.url+"changeUser/"+id, 1);
  }

  getAllOrders() {
    return this.http.get(this.url+"orders");
  }

  getOrder(id: number) {
    return this.http.get(this.url+"order/"+id);
  }

  changeOrder(id: number, st: string) {
    return this.http.put(this.url+"order/"+id, {"status": st});
  }

  getOrderItems(id: number) {
    return this.http.get(this.url+"orders/"+id+"/items");
  }

  getReport() {
    return this.http.get(this.url+"report");
  }
}

