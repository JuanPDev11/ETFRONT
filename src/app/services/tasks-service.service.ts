import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {
  myAppUrl = environment.endpoint;
  myApiUrlT = 'api/Tasks/';
  myApiUrlS = 'api/Sender/';
  myApiUrlU = 'api/User/';

  constructor(private _http:HttpClient,private _serviceA:AccountService) { }

  //Task
  getTasks(): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);


    return this._http.get(`${this.myAppUrl}${this.myApiUrlT}getTasks`, {headers});
  }

  getTasksOrder(): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlT}getTasksOrder`, {headers});
  }

  getTasksOrderSuper(): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlT}getTasksOrderSuper`, {headers});
  }

  getTask(id: number): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);


    return this._http.get(`${this.myAppUrl}${this.myApiUrlT}getTask/${id}`, {headers});
  }

  postTask(data: FormData, id?: number): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlT}postTask`;
    if (id != undefined || id != null) {
      path += `/${id}`
    }

    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);


    return this._http.post(path, data, {headers});
  }

  deleteTask(id: number): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.delete(`${this.myAppUrl}${this.myApiUrlT}deleteTask/${id}`, {headers});
  }

  //sender
  getSenders(id?: number): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlS}getSenders`;
    if (id != undefined || id != null) {
      path += `/${id}`
    }

    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.get(path, {headers});
  }

  sendEmail(data: FormData): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.post(`${this.myAppUrl}${this.myApiUrlS}sendEmail`, data, {headers});
  }

  postSender(id?: number, data?: FormData): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlS}postSender`;
    if (id != undefined || id != null) {
      path += `/${id}`
    }

    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.post(path, data, {headers});
  }

  deleteSender(id: number): Observable<any> {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.delete(`${this.myAppUrl}${this.myApiUrlS}deleteSender/${id}`, {headers});
  }

  //Users

  getUsers(id?: string): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlU}getUsers`;
    if (id != undefined || id != null) {
      path += `/${id}`
    }

    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.get(path, {headers});
  }

  updateUser(id: string, data: FormData) {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.post(`${this.myAppUrl}${this.myApiUrlU}updateUser/${id}`, data, {headers});
  }

  deleteUser(id: string) {
    var jwt = this._serviceA.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.delete(`${this.myAppUrl}${this.myApiUrlU}deleteUser/${id}`, {headers})
  }

  //INBOX
  getMails(): Observable<any> {
    return this._http.get(`${this.myAppUrl}api/Inbox/getMails`);
  }
}
