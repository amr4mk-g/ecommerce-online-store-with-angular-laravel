import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  loading = true
  includeOut = true 
  includeSoon = true
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private authService: AuthService, 
    private service: ProductsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res.products;
      this.filteredProducts = res.products;
      this.loading = false
    }, err => this.showToast('Something went wrong, try again!') )
  }

  addToCart(pId: number) {
    if (!this.authService.getIsLogin()) {
      this.showToast('You have to be a member, Please Sign In or Sign Up first!')
      return
    }
    this.loading = true
    this.service.addToCart(pId).subscribe((res: any) => {
      this.showToast('Product added to your cart successfully')
    }, err => { 
      if (err.error.message) this.showToast(err.error.message)
      else this.showToast('Something went wrong, try again!'); 
    })
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.includeOut = true 
    this.includeSoon = true
  }

  onCheckChange() {
    this.filteredProducts = this.products.filter(product => {
      if (product.status == 'out') return this.includeOut
      else if (product.status == 'soon') return this.includeSoon
      else return true
    })
  }

  details(index: number) {
    this.dialog.open(ProductDetailsComponent, {width: '700px', 
        data: {product: this.filteredProducts[index]}});
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
