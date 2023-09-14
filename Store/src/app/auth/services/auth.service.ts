import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { User } from '../models/user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl        
  listener = new Subject<boolean>()
  token: string = ''        
  isLogin = false  
  
  constructor(private http: HttpClient, private router: Router) {}

  signup(data: User) {
    return this.http.post(this.url+'signup', data) 
  }

  login(data: User) {
    return this.http.post(this.url+'login', data) 
  }
 
 logout() {  
    this.http.get(this.url+'logout')
    this.clearAuth()       
    this.setData('') 
  }    

  setData(token: string) { 
    this.token = token || '';         
    this.isLogin = !!token;        
    this.listener.next(!!token);         
    this.router.navigate(['/products']); 
  }    

  getToken() { 
    return this.token 
  }            

  getIsLogin() { 
    return this.isLogin 
  }         

  getListener() { 
    return this.listener.asObservable() 
  }         

  private clearAuth() { 
    localStorage.removeItem('token')      
    localStorage.removeItem('expire') 
  }    

  autoAuth() { 
    let token = localStorage.getItem('token')         
    if (!token) return                    
    this.setData(token) 
  } 

  forgetPassword(data: any) {
    return this.http.post(this.url+'forget', data) 
  }

  resetPassword(data: any) {
    return this.http.post(this.url+'reset', data) 
  }
}