import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoleService } from '../services/role.service';
import { SharedService } from '../services/shared.service';



@Injectable({
  providedIn: 'root'
})
export class supervisorGuard implements CanActivate {
  islocal = this.checkLocal();
  constructor(private _serviceR: RoleService, private _redirect: Router, private _ServiceS: SharedService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const expectedRoleSuper = route.data['expectedRoleSuper'];
    const expectedRoleAnalist = route.data['expectedRoleAnalist'];
    if (this.islocal) {

      const actualRole = this._serviceR.getRole();

      if (!actualRole) {
        this._ServiceS.showModal('Unauthorized', 'this area is for Analist or Supervisor');
        this._redirect.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }

      if (actualRole !== expectedRoleSuper) {
        this._ServiceS.showModal('Unauthorized', 'this area is for Supervisor');
        this._redirect.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }


      return of(true);
    }
    return of(true);

  }

  checkLocal() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }


}
