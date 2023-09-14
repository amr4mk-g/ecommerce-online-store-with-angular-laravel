import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard{
    constructor(private service: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.service.getIsLogin()) return true;
        else return this.router.createUrlTree(['/signin']);
    }
}