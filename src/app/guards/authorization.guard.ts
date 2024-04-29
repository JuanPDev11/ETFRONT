import { AccountModule } from '../account/account.module';
import { AccountService } from '../services/account.service';


import { AppComponent } from '../app.component';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  private isLocalStorage!: boolean;
  constructor(private serviceAccount: AccountService, private serviceShared: SharedService,
    private _redirect: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    this.isLocalStorage = this.checkLocalStorage();
    let local;
    if (this.isLocalStorage) {
      local = localStorage.getItem(environment.userKey);
    }
    if (local !== null) {
      console.log("from true");
      return of(true);
    } else {
      console.log("from false");
      this.serviceShared.showModal("Please Login", "You must be logged")
      this._redirect.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    }
  }

  checkLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
}
