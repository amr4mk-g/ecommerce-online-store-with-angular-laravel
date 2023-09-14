import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  placeOrder() {
    return this.http.post(this.url+'user/order', 1);
  }

  updateCart(data: any) {
    return this.http.post(this.url+'user/cart', data);
  }

  deleteItem(data: any) {
    return this.http.post(this.url+'user/cartDel', data);
  }

  getUser() {
    return this.http.get(this.url+'user');
  }

  updateUser(data: any) {
    return this.http.post(this.url+'user', data);
  }

  getCart() {
    return this.http.get(this.url+'user/cart');
  }

  getOrders() {
    return this.http.get(this.url+'user/orders');
  }
}
