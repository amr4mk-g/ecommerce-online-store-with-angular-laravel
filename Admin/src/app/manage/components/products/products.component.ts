import { Component, OnInit } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../../models/product';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  loading = true
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  products: Product[] = []
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: ManageService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.viewProducts()
  }

  viewProducts() {
    this.service.getAllProducts().subscribe((res: any) => {
      this.filteredProducts = res.products
      this.products = res.products
      this.loading = false
    }, err => { this.showToast('Something went wrong, try again!'); })
  }

  addOne(product: Product) {
    this.loading = true
    this.service.addProduct(product).subscribe((res: any) => {
      this.viewProducts();
      this.showToast('Product added successfully');
    }, err => { this.showToast('Something went wrong, try again!'); })
  }

  editOne(id: number, product: Product) {
    this.loading = true
    this.service.editProduct(id, product).subscribe((res: any) => { 
      this.viewProducts();
      this.showToast('Product updated successfully');
    }, err => { this.showToast('Something went wrong, try again!'); })
  }

  deleteOne(id: number) {
    this.loading = true
    this.service.deleteProduct(id).subscribe((res: any) => {
      this.viewProducts();
      this.showToast('Product deleted successfully');
  }, err => { this.showToast('Something went wrong, try again!'); })
  }

  openModalAdd() {
    let dialog = this.dialog.open(AddProductComponent, {width: '600px', disableClose: true,
      data: { product: {name: '', category: '', description: '',
        price: 0, stock: 0, status: 'available', image: undefined} }});
    dialog.afterClosed().subscribe((result: Product) => { 
      if (result) this.addOne(result);
    });
  }

  openModalEdit(id: number) {
    let index = this.products.findIndex(it => it.id == id);
    if (index == -1) this.showToast('Something went wrong, try again!');
    let dialog = this.dialog.open(AddProductComponent, {width: '600px', disableClose: true,
      data: {product: this.products[index]}});
    dialog.afterClosed().subscribe((result: Product) => {
      if (result) this.editOne(id, result);
    });
  }

  openModalDelete(id: number): void {
    let dialog = this.dialog.open(ConfirmDeleteComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) this.deleteOne(id);
    });
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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
}
