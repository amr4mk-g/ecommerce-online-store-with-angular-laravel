import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private authListener!: Subscription
  loggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.getIsLogin();
    this.authListener = this.auth.getListener()
    .subscribe(res => this.loggedIn = res)
  }

  logout() {
    this.loggedIn = false
    this.auth.logout()
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe()    
  }

  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  toggleNavbar() {
    this.navbarCollapse.nativeElement.classList.toggle('show');
  }
}
