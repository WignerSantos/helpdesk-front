import { AuthService } from './../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authenticated = this.authService.isAutheticated();

    if(authenticated) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

}