import { Component, OnInit } from '@angular/core';
import { SettingsProvider } from '../../providers/settings/settings';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { ModalController, NavController, Platform, NavParams, ViewController, ToastController, List, App } from 'ionic-angular';


@Component({
  templateUrl: 'rewards.html'
})
export class BasicPage implements OnInit{
  promoList: () => List;
  promoListString: string;
  data: any;
  loading: any;

  constructor(
    public modalCtrl: ModalController, 
    public settings: SettingsProvider, 
    public viewCtrl: ViewController,  
    private toastCtrl: ToastController, 
    public authService: AuthService,
    public navCtrl: NavController,
    public app: App) { 
  }

  logout() {
    this.authService.doLogout().then((result) => {
      this.loading.dismiss();
      localStorage.removeItem('token');
      location.reload();
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
      this.presentToast(err);
    });
  }

  ngOnInit() {

    this.settings.getAllPromotions().then((result) => {
      this.data = result;
      this.promoList = JSON.parse(this.data);
      this.promoListString = this.data;
    }, (err) => {
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

  openModal(rewardID) {

    let modal = this.modalCtrl.create(ModalContentPage, {data: this.promoList, promoID: rewardID});
    modal.present();
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
        <h2>{{Reward.Title}}</h2>
        <p>{{Reward.Description}}</p>
      </ion-item>
      <ion-item>
        Start Date:
        <ion-note item-end>
          {{Reward.PromotionStartDateString}}
        </ion-note>
      </ion-item>
      <ion-item>
        End Date:
        <ion-note item-end>
          {{Reward.PromotionEndDateString}}
        </ion-note>
      </ion-item>
      <ion-item>
        Tokens Required:
        <ion-note item-end>
          {{Reward.TokensRequired}}
        </ion-note>
      </ion-item>
  </ion-list>
  <button ion-button block (click)="redeemReward(Reward.Id)">
      Redeem Reward
  </button>
  
</ion-content>
`
})
export class ModalContentPage {
  Reward;
  data: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    public settings: SettingsProvider
  ) {
    var rewarddetails = params.get('data');
    var promoID = params.get('promoID');
    //this.presentToast(promoID);

    this.Reward = rewarddetails.find(item => item.Id === promoID);
  }

  redeemReward(rewardID) {
      this.settings.RedeemRewards(rewardID).then((result) => {
        this.data = result;
        this.presentToast(JSON.stringify(this.data.message));
      }, (err) => {
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