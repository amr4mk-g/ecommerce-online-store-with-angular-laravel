import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = environment.apiUrl;;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.url+'products');
  }

  addToCart(pId: number) {
    let data = {'product_id': pId, 'quantity': 1}
    return this.http.post(this.url+'user/toCart', data);
  }
}
