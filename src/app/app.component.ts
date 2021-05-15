import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SeamxEvent } from './models/seamxevent';
import { EventsService } from './services/events.service';
import { AppEventsService } from './services/app-events.service';

import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from './services/notification.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public events: Array<SeamxEvent>;
  activeEvent: SeamxEvent;
  token: string;
  baseUrl: string;
  notification: any;

  constructor(
    private apiSvc: ApiService,
    private platform: Platform,
    private menuCtrl: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private eventsSvc: EventsService,
    private notificationSvc: NotificationService,
    public appEvents: AppEventsService,
    private translate: TranslateService,
    private router: Router,
    private fcm: FCM
  ) {
    this.events = [];
    this.baseUrl = environment.serverBaseUrl;
    this.initializeApp();
    translate.setDefaultLang('gr');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        console.log(token);
        this.apiSvc.sendFCMToken(token).subscribe((res) => {
          if(res.body.toString().split(':').length >1) {
            const tokenId = res.body.toString().replace('tokenId:', '');
            this.notificationSvc.setTokenId(tokenId);
          }
          // this.token = res.body[0];
        });
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log('this will print when app in background', data);
        this.activeEvent = this.eventsSvc.getActiveEvent();
        
        if(data.wasTapped) {
          console.log('Received in Background', data);
          // this.router.navigate([data.landing_page, data.notification]);
        } else {
          console.log('Received in foregrounnd', data);
          this.notification = data;
          // this.router.navigate([data.landing_page, data.notification]);
        }
      });

      this.fcm.subscribeToTopic('all');
      // this.fcm.unsubscribeFromTopic('marketing');

      this.appEvents.subscribe('events:available',()=>{
          this.events = this.eventsSvc.getEvents();
      });
    });
    const allNewsItems = document.querySelectorAll('.news-item');
    allNewsItems.forEach((newsitem) => {
      if (newsitem.shadowRoot.children[0]) {
        newsitem.shadowRoot.children[0].setAttribute('style', 'background-color:transparent !important');
      }
    });
  }

  alarmTab() {
    this.notification = {};
    const notitab = document.querySelectorAll('.noti-alarm');
    notitab[0].setAttribute('style', 'display: none !important');
  }


  openEvent(index: number){
    
    this.menuCtrl.toggle();
    this.appEvents.publish('open:event', { idx: index });
  }
}
