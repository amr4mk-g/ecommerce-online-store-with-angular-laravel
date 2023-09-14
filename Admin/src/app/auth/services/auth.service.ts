import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { environment } from 'src/environment/environment'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl        
  listener = new Subject<boolean>()
  token: string = ''        
  isLogin = false  
  
  constructor(private http: HttpClient, private router: Router) { }    
  
  login(data: User) {
    return this.http.post(this.url+'adLogin', data) 
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
    if (token == '') this.router.navigate(['/signin']);    
    else this.router.navigate(['/reports']); 
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
}
