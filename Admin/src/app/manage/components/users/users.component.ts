import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '../../services/manage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  loading = true
  users: User[] = []
  toastShow = false
  toastMessage = ''
  timer: any

  constructor(private service: ManageService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.viewUsers()
  }

  viewUsers() {
    this.service.getAllUsers().subscribe((res: any) => {
      this.users = res.users
      this.loading = false
    }, err => { this.showToast('Something went wrong, try again!'); })
  }

  changeUser(id: number, type: number) {
    this.loading = true
    this.service.changeUser(id).subscribe((res: any) => {
      this.viewUsers();
      this.loading = false;
      if (type == 1) this.showToast('User activated successfully')
      else  this.showToast('User deactivated successfully')
    }, err => { this.showToast('Something went wrong, try again!'); })
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
