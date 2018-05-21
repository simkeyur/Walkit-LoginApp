import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, App } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

let apiUrl = 'https://walkitwebq5ddfwc2xgwvc.azurewebsites.net/Api/';

@Injectable()
export class AuthService {

  constructor(public http: Http, public toastCtrl: ToastController, public app: App) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl+'login?username=' + credentials.username +'&password=' + credentials.password, {headers: headers})
          .subscribe(res => {
            var response = res.json() ;
            if(response.success == false){
              //this.presentToast(JSON.stringify(response.message));
              reject(response.message);
            }else{
              localStorage.setItem("patientFirstName", response.person.FirstName);
              localStorage.setItem("patientLastName", response.person.LastName);
              localStorage.setItem("patientID", JSON.stringify(response.user.Id));
              //this.presentToast(JSON.stringify(response.message));
              resolve(res.json());
            }

          }, (err) => {
            reject(err);
          });
    });
  }

  doLogout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));
        this.http.get(apiUrl+'Signout',{headers: headers})
          .subscribe(res => { 
            var response = res.json() ;
            if(response.success == false){
              this.presentToast(JSON.stringify(response.message));
              reject(response.message);
            }else{
              this.presentToast(JSON.stringify(response.message));
              localStorage.clear();
              resolve(res.json());
            }
            
          }, (err) => {
            reject(err);
          });
    });
  }

  presentToast(toast_message) {
    let toast = this.toastCtrl.create({
      message: toast_message,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }


}
