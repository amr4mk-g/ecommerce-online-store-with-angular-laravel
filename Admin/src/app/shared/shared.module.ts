import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastComponent } from './components/toast/toast.component';
import { EmptyComponent } from './components/empty/empty.component';

@NgModule({
  declarations: [
    LoadingComponent, ToastComponent, EmptyComponent
  ],
  imports: [
    CommonModule, RouterModule, BrowserModule
  ],
  exports: [LoadingComponent, ToastComponent, EmptyComponent]
})
export class SharedModule { }
