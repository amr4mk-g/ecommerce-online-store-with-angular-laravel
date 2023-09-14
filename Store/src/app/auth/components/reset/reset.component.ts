import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit{
  form!: FormGroup;
  loading = false
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: AuthService, private formBuilder: FormBuilder) {}  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pass1: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let email = ''
      let pass1 = this.form.value.pass1;
      let pass2 = this.form.value.pass2;
      if (pass1 !== pass2) this.form.patchValue({pass2: ''});
      let data = {email, password: pass1, password_confirm: pass1}
      this.service.resetPassword(data).subscribe((res: any) => { 
        console.log(res)
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
