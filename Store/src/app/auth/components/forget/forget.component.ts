import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit{
  form!: FormGroup;
  loading = false
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: AuthService, private formBuilder: FormBuilder) {}  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let email = this.form.value.userEmail;
      this.service.forgetPassword({email}).subscribe((res: any) => { 
        console.log(res)
      }, err => {
        if (err.error.message.email) this.showToast(err.error.message.email[0])
        else if (err.error.message.includes('Duplicate entry')) 
            this.showToast('An email has already been sent')
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
