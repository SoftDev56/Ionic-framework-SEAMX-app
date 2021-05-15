import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.page.html',
  styleUrls: ['./invite-friend.page.scss'],
})
export class InviteFriendPage implements OnInit {

  showMore: boolean;
  isFromProfile: boolean;
  inEmail: string;
  inotherEmail: string;
  // @Input()
  // static inEmail: string;

  constructor(
    private profileSvc: ProfileService,  
    public navCtrl: NavController,  
    public authSvc: AuthService,  
    public apiSvc: ApiService,
    private eventsSvc: EventsService
    ) { 
    this.showMore = false;
  }

  ngOnInit() {
    this.showMore = false;
    this.isFromProfile = this.profileSvc.getFromProfile();
  }

  ionViewDidEnter(){
    this.showMore = false;
    this.isFromProfile = this.profileSvc.getFromProfile();
  }

  sendInvites() { 
    let userName = this.authSvc.user.firstname + ' ' + this.authSvc.user.lastname;
    let eventIds = this.authSvc.user.events;
    let eventName = this.eventsSvc.getActiveEvent().name;
    let emails
    if (this.inotherEmail) {
      emails = this.inEmail+','+this.inotherEmail;
    } else {
      emails = this.inEmail;
    }
    console.log(
      'eventIds: '+userName + '  ' +
      'eventIds: '+eventIds + '  ' +
      'eventIds: '+eventName + '  ' +
      'emails; '+ emails);
    this.apiSvc.sendInvitation(userName, eventIds, eventName, emails).subscribe(
      data => {
        console.log(data.body);
        console.log('Sent Invitation to your friend Successfully');
      });

    if(this.isFromProfile){
      this.navCtrl.navigateRoot('/tab-root/tabs/profile'); 
    } else {
      console.log('going to allset page.');
      this.navCtrl.navigateForward('/allset');
    }
  }

  getEmail(e: any) {
    this.inEmail = e.target.value;
    console.log('email1: ' + this.inEmail);
  }

  getotherEmail(e: any) {
    // e.target.value.split(',')
    this.inotherEmail = e.target.value;
    console.log('email2: ' + this.inotherEmail);
  }

  public addMore(){
    this.showMore = true;
  }

}
