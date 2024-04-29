import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Register } from '../interfaces/Register';
import { ReplaySubject, map, of } from 'rxjs';
import { User } from '../interfaces/User';
import { Login } from '../interfaces/Login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private islocalAvailable = this.checkLocalStorage();
  myApiUrl = environment.endpoint;
  private userSource = new ReplaySubject<User | null>(1)
  user$ = this.userSource.asObservable();

  constructor(private _http: HttpClient, private _redirect: Router) { }

  register(model: Register) {
    return this._http.post(`${this.myApiUrl}api/account/register`, model);
  }

  login(model: Login) {
    return this._http.post<User>(`${this.myApiUrl}api/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }


  getJWT() {
    if (this.islocalAvailable) {
      const key = localStorage.getItem(environment.userKey);

      if (key) {
        const user: User = JSON.parse(key);
        return user.jwt;
      } else {
        return null
      }
    } else {
      return null;
    }
  }

  refreshUser(jwt:string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined)
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);
    return this._http.get<User>(`${this.myApiUrl}api/account/refresh-token`, { headers }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this._redirect.navigate(['']);
  }

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
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
