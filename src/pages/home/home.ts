import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { Pedometer } from '@ionic-native/pedometer';
import { AuthService } from '../../providers/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { SettingsProvider } from '../../providers/settings/settings';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;
  steps: number = 0;
  goal: number;
  percentage: number;

  constructor(private ref: ChangeDetectorRef, public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public platform: Platform, public pedometer: Pedometer, public modalCtrl: ModalController, public settings: SettingsProvider) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.pedometer.startPedometerUpdates()
      .subscribe((data) => {
          this.steps = data.numberOfSteps;
          this.setPercentage();
          this.ref.detectChanges();
        });
 
    this.goal = this.settings.getGoal();
    this.setPercentage();
    }
  }

  logout() {
    this.authService.logout().then((result) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  setPercentage() {
    this.percentage = (this.steps / this.goal) * 100;
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

}
