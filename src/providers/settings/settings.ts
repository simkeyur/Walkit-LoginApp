import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
let apiUrl = 'https://walkitwebq5ddfwc2xgwvc.azurewebsites.net/Api/';

@Injectable()
export class SettingsProvider {
  goal: number = 1000;
  tokens: number = 0;

  constructor(public http: Http, public toastCtrl: ToastController, public app: App) {
  }
 
  getGoal() {
    this.getPatientGoal();
    return this.goal;
  }

  getTokens() {
    this.getPatientTokens();
    return this.tokens;
  }

  getPatientGoal() {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let patientID = localStorage.getItem("patientId");
        this.http.get(apiUrl+'GetPatientRecommendations=' + patientID, {headers: headers})
          .subscribe(res => {
            var response = res.json() ;
            if(response.current == false){
              //this.presentToast(JSON.stringify(response.message));
              reject(response.message);
            }else{
              this.goal = response.currentRecommendation.minSteps;
              localStorage.setItem("CurrentPatientGoal", response.currentRecommendation.minSteps);
              resolve(this.goal);
            }

          }, (err) => {
            reject(err);
          });
    });
  }
 
  getPatientTokens() {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let patientID = localStorage.getItem("patientId");
        this.http.get(apiUrl+'GetPatientTokens=' + patientID, {headers: headers})
          .subscribe(res => {
            var response = res.json();
            this.tokens = response.balance;
            resolve(res.json());

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