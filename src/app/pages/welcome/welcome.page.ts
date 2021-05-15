import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SeamxEvent } from '../../models/seamxevent';
import { EventsService } from '../../services/events.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  registeredEvents: number;
  userName: string;
  eventName: string;
  events: Array<SeamxEvent>;
  baseUrl: string;
  seamxEvent: SeamxEvent;
  isFirstLogin = false;
  // eventPagescontent: any;

  constructor(
    public navCtrl: NavController,
    private authSvc: AuthService,
    private eventsSvc: EventsService
    )
    {
      this.baseUrl = environment.serverBaseUrl;
      this.eventName = 'Sie Sou Marathon 2020';
      this.registeredEvents = 0;
    }

  ionViewDidEnter() {
    const user = this.authSvc.getUser();
    this.userName = user.firstname + ' ' + user.lastname;
    this.registeredEvents = user.events.length;
    this.eventsSvc.fetchEvents(user.events).then( (events: Array<SeamxEvent>) => {
        this.events = events;
        // console.log(this.events);
        if (events.length === 1) {
          this.eventName = events[0].name;
        }
    });
  }

  ngOnInit() {
    // this.eventPagescontent = this.seamxEvent.pagescontent;
  }

  goToGoal(event: SeamxEvent) {
    this.eventsSvc.setActiveEvent(event);
    this.navCtrl.navigateForward('/tab-root');
  }

}
