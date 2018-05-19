import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../pages/login/login';

let apiUrl = 'https://walkitwebq5ddfwc2xgwvc.azurewebsites.net/Api/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl+'login', {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));
        this.http.get(apiUrl+'Signout',{headers: headers})
          .subscribe(res => { 
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }

}
