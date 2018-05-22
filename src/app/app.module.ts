import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { Pedometer } from '@ionic-native/pedometer';
import { BackgroundMode } from '@ionic-native/background-mode';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingsPage, SettingsModalPage } from '../pages/settings/settings';
import { AuthService } from '../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SettingsProvider } from '../providers/settings/settings';
import { ExpandableComponent } from '../components/expandable/expandable';
import { BasicPage as RewardsPage, ModalContentPage } from '../pages/rewards/pages';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RewardsPage,
    ModalContentPage,
    SettingsModalPage,
    ExpandableComponent,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), BrowserModule, HttpModule, RoundProgressModule, NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RewardsPage,
    SettingsModalPage,
    ModalContentPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService,Pedometer,
    SettingsProvider],
  exports: [ExpandableComponent]
})
export class AppModule {}
