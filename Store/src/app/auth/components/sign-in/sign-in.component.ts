import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  form!: FormGroup;
  loading = false
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: AuthService, private formBuilder: FormBuilder) {}  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPass: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true
      let email = this.form.value.userEmail;
      let password = this.form.value.userPass;

      this.service.login({email, password}).subscribe((res: any) => { 
        if (res.token) {
          localStorage.setItem('token', res.token)
          this.service.isLogin = true
          this.service.setData(res.token)
        }
      }, err => {
        if (err.error.message) this.showToast(err.error.message) 
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
