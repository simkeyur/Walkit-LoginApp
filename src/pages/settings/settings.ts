import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
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
  isLoggedIn: boolean = false;
  patientID = localStorage.getItem("patientID");
  patientFirstName = localStorage.getItem("patientFirstName");
  patientLastName = localStorage.getItem("patientLastName");
 
  constructor(public viewCtrl: ViewController,  public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public settings: SettingsProvider) {
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
  }

  update() {
    let value = Math.trunc(this.goal);
    this.viewCtrl.dismiss(true);
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

 
  dismiss() {
    this.viewCtrl.dismiss();
  }
}