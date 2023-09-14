import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss']
})
export class CheckoutOrderComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<CheckoutOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {orderData: any}) {}

  ngOnInit() {
  }

  send() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
