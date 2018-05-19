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
import { SettingsPage } from '../pages/settings/settings';
import { RewardsPage } from '../pages/rewards/rewards';
import { AuthService } from '../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { SettingsProvider } from '../providers/settings/settings';
import { ExpandableComponent } from '../components/expandable/expandable';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RewardsPage,
    ExpandableComponent,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), BrowserModule, HttpModule, RoundProgressModule
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
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService,Pedometer,
    SettingsProvider],
  exports: [ExpandableComponent]
})
export class AppModule {}
