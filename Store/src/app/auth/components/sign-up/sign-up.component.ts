import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  form!: FormGroup;
  loading = false
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: AuthService, private formBuilder: FormBuilder) {}  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPass: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true
      let name = this.form.value.userName;
      let email = this.form.value.userEmail;
      let password = this.form.value.userPass;

      this.service.signup({name, email, password}).subscribe((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          this.service.isLogin = true
          this.service.setData(res.token)
        }
      }, err => {
        if (err.error.message.email) this.showToast(err.error.message.email[0])
        else if (err.error.message) this.showToast(err.error.message)
      })
    }
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
