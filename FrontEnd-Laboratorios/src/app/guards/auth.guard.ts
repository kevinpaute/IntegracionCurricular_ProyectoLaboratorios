import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRole();
    const requiredRole = route.data['role'];

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
