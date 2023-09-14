import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SharedModule
  ]
})
export class AuthModule { }
