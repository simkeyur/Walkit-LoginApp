import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, App, LoadingController, ToastController, List } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
let apiUrl = 'https://walkitwebq5ddfwc2xgwvc.azurewebsites.net/Api/';

@Injectable()
export class SettingsProvider {
  goal: number;
  tokens: number;
  promotionList: List;

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

  getPromotions() {
    this.getAllPromotions();
    return this.promotionList;
  }

  getPatientGoal() {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let patientID = localStorage.getItem("patientID");
        this.http.get(apiUrl+'GetPatientRecommendations?patientId=' + patientID, {headers: headers})
          .subscribe(res => {
            var response = res.json() ;
            if(response.currentRecommendation == null){
              //this.presentToast(JSON.stringify(response.message));
              reject("You do not have any Recommendation!");
            }else{
              this.goal = response.currentRecommendation.MinSteps;
              localStorage.setItem("CurrentRecommendationID", JSON.stringify(response.currentRecommendation.Id));
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
        let patientID = localStorage.getItem("patientID");
        this.http.get(apiUrl+'GetPatientTokens?patientId=' + patientID, {headers: headers})
          .subscribe(res => {
            var response = res.json();
            this.tokens = response.balance;
            //this.presentToast(JSON.stringify("tokens got for patient" + patientID + ": " + response.balance));
            localStorage.setItem("CurrentPatientTokens", response.balance);
            resolve(this.tokens);

          }, (err) => {
            reject(err);
          });
    });
  }

  GivePatientToken(patientID, recommID) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let patientID = localStorage.getItem("patientID");
        this.http.get(apiUrl+'RewardWalkITToken?patientId=' + patientID +'&recommendationId='+ recommID, {headers: headers})
          .subscribe(res => {
            var response = res.json();
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  RedeemRewards(rewardID) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let patientID = localStorage.getItem("patientID");
        this.http.get(apiUrl+'RedeemTokenReward?patientId=' + patientID +'&promotionId='+ rewardID, {headers: headers})
          .subscribe(res => {
            var response = res.json();
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  GetRedeemedRewards() {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let patientID = localStorage.getItem("patientID");
        this.http.get(apiUrl+'GetPatientRedemptionHashes?patientId=' + patientID, {headers: headers})
          .subscribe(res => {
            var response = res.json();
            if(response.list == null){
              reject(response.message);
            }else{
              this.promotionList = response.list;
              //localStorage.setItem("CurrentPromotionList", JSON.stringify(response.list));
              //this.presentToast(JSON.stringify(response.list));
              resolve(JSON.stringify(this.promotionList));
            }
          }, (err) => {
            reject(err);
          });
    });
  }

  getAllPromotions() {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(apiUrl+'GetAllPromotions', {headers: headers})
          .subscribe(res => {
            var response = res.json();
            if(response.list == null){
              //this.presentToast(JSON.stringify(response.message));
              reject(response.message);
            }else{
              this.promotionList = response.list;
              //localStorage.setItem("CurrentPromotionList", JSON.stringify(response.list));
              //this.presentToast(JSON.stringify(response.list));
              resolve(JSON.stringify(this.promotionList));
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