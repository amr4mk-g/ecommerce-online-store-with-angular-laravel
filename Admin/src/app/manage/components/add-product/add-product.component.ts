import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent{
  @ViewChild('productForm') productForm!: NgForm;

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product}) {}

  saveProduct() {
    if (this.productForm.valid) this.dialogRef.close(this.data.product);
  }

  cancel() {
    this.dialogRef.close();
  }

  previewImage(event: any) {
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {this.data.product.image = e.target.result};
      reader.readAsDataURL(file);
    }
  }
}
