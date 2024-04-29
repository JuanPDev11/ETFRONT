import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable()
export class jwtInterceptor implements HttpInterceptor {

  constructor(private _serviceA: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._serviceA.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          //clone from the comming request and add autorization header to that
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwt}`
            }
          });
        }
      }
    })

    return next.handle(req);

  }



}
