import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _serviceA: AccountService) { }

  getRole() {
    let key = this._serviceA.getJWT();
    if (key !== null) {
      let dtoken: any = jwtDecode(key)
      return dtoken.role
    }
  }
}
