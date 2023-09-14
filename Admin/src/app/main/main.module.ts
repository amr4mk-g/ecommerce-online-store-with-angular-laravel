import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, BrowserModule, AuthModule], 
  exports: [HeaderComponent]
})
export class MainModule {}
