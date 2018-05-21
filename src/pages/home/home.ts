import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class HomePage implements OnInit{

  loading: any;
  isLoggedIn: boolean = false;
  steps: number = 0;
  CurrGoal: number;
  CurrTokens: number;
  percentage: number;
  data: any;
  patientID: string;
  recommID: string;

  constructor(private ref: ChangeDetectorRef, public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public platform: Platform, public pedometer: Pedometer, public modalCtrl: ModalController, public settings: SettingsProvider) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.StartPedometer();
    }
  }

  StartPedometer(){
    this.pedometer.startPedometerUpdates()
    .subscribe((data) => {
        this.steps = data.numberOfSteps;
        this.setPercentage();
        this.ref.detectChanges();
        if(this.steps % this.CurrGoal === 0){
          this.ResetPedometer();
        }
      });
  }

  ResetPedometer(){
          this.presentToast("Congratulations! You achieved your goal.");
          this.patientID = localStorage.getItem("patientID");
          this.recommID = localStorage.getItem("CurrentRecommendationID");
          this.GiveWalkitToken(this.patientID, this.recommID);
          this.StartPedometer();
          //location.reload();
  }



  ngOnInit() {

    this.settings.getPatientGoal().then((result) => {
      this.data = JSON.stringify(result);
      this.CurrGoal = parseInt(this.data);
      this.setPercentage();
    }, (err) => {
      //this.presentToast(err);
    });

    this.settings.getPatientTokens().then((result) => {
      this.data = JSON.stringify(result);
      this.CurrTokens = parseInt(this.data) || 0;
    }, (err) => {
      //this.presentToast(err);
    });
  }

  GiveWalkitToken(patientID, recommID){
    this.settings.GivePatientToken(patientID, recommID).then((result) => {
      this.data = result;
      this.presentToast(JSON.stringify(this.data.message));
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  setPercentage() {
    this.percentage = (this.steps / this.CurrGoal) * 100;
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
