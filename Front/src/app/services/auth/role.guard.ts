import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const userRoles = this.authService.getRoles();

    const hasRole = expectedRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }


}
