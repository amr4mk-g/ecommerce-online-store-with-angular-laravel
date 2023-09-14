import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  loading = true
  userData: any = {name: '', email: '', phone: '', address: ''}
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.service.getUser().subscribe((res: any) => {
      this.userData = {name: res.user.name, email: res.user.email, 
        phone: res.user.phone, address: res.user.address};
      this.loading = false
    }, err => { this.showToast('Something went wrong, try again!') })
  }

  update() {
    let data = {'name': this.userData.name, 'phone': this.userData.phone, 
        'address': this.userData.address}
    this.service.updateUser(data).subscribe((res: any) => {
      this.showToast(res.message)
    }, err => { this.showToast('Something went wrong, try again!') })
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
