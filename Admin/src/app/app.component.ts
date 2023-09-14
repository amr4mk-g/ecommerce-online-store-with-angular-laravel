import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = environment.appName;

  constructor(private service: AuthService){}

  ngOnInit(): void { this.service.autoAuth() }
}
