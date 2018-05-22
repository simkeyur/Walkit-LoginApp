import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { ViewController, ModalController, NavController, App, Platform, NavParams, LoadingController, ToastController, List } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { LoginPage } from '../login/login';
 
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  goal: number;
  tokens: number;
  loading: any;
  data: any;
  redemeedList: () => List;
  createdCode = "keyurpatel";
  patientID = localStorage.getItem("patientID");
  patientFirstName = localStorage.getItem("patientFirstName");
  patientLastName = localStorage.getItem("patientLastName");
 
  constructor(
    public viewCtrl: ViewController,  
    public app: App, 
    public navCtrl: NavController, 
    public authService: AuthService, 
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    public settings: SettingsProvider,
    public modalCtrl: ModalController) 
    {
    this.goal = this.settings.getGoal();
    
    }
 
  public refreshTokens() {
    this.settings.getPatientTokens().then((result) => {
      this.data = JSON.stringify(result);
      this.tokens= parseInt(this.data) || 0;
    }, (err) => {
      this.presentToast(err);
    });
  }

  createCode() {
    this.createdCode = "Keyur";
  }


  public openQRCode(rewardID) {
    let modalRedeem = this.modalCtrl.create(SettingsModalPage, {data: this.redemeedList, redeemID: rewardID});
    modalRedeem.present();
  }

  ngOnInit() {

    this.settings.getPatientGoal().then((result) => {
      this.data = JSON.stringify(result);
      this.goal = parseInt(this.data) || 100;
    }, (err) => {
      this.presentToast(err);
    });

    this.settings.getPatientTokens().then((result) => {
      this.data = JSON.stringify(result);
      this.tokens= parseInt(this.data) || 0;
    }, (err) => {
      this.presentToast(err);
    });

    this.settings.GetRedeemedRewards().then((result) => {
      this.data = result;
      this.redemeedList = JSON.parse(this.data);
    }, (err) => {
      this.presentToast(err);
    });
  }

  logout() {
    this.authService.doLogout().then((result) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
      this.presentToast(err);
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

 
  dismiss() {
    this.viewCtrl.dismiss();
  }
}


@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Reward Details
    </ion-title>
    <ion-buttons start>
      <button primary ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows" large></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        <h2>{{RewardDetail.PromotionName}}</h2>
        <p>{{RewardDetail.PromotionDescription}}</p>
      </ion-item>
      <h5>Scan this QR Code for redemption</h5>
      <ion-card>
          <ngx-qrcode [qrc-value]="createdCode"></ngx-qrcode>
          <ion-card-content>
            <p>Value: {{ createdCode }}</p>
          </ion-card-content>
        </ion-card>
  </ion-list>
  
</ion-content>
`
})
export class SettingsModalPage {
  RewardDetail;
  data: any;
  createdCode;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    public settings: SettingsProvider
  ) {
    var rewarddetails = params.get('data');
    var redeemID = params.get('redeemID');
    this.RewardDetail = rewarddetails.find(item => item.Id === redeemID);
    this.createdCode = this.RewardDetail.Hash;
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

  


  dismiss() {
    this.viewCtrl.dismiss();
  }
}