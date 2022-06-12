import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminVerifyGuard implements CanActivate {
  constructor (private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
  
}
