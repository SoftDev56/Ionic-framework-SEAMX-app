import { Component, OnInit, Output, Input, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../../models/user';
import { PrepService } from '../../services/prep.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import {Storage} from "@ionic/storage";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  openNotifSettings: boolean;
  selectedNotif: string;
  // isImageTaken: boolean = false;
  static isImageTaken: boolean = false;
  constructor(
    public navCtrl: NavController,
    private prepSvc: PrepService,
    private profileSvc: ProfileService,
    private authSvc: AuthService,
    private storage: Storage,
    ) { 
      // this.isImageTaken = ProfilePage.isImageTaken

    this.openNotifSettings = false;
    this.selectedNotif = 'never';

    this.user = new User();
    this.user.image = 'assets/img/profile.jpg';
  }

  ngOnInit() {
    this.user = this.authSvc.getUser();
    // if(this.user.image.split('http')[1] == undefined) {
    this.user.image = environment.baseUrl + this.user.image;
    // }
    this.selectedNotif = this.profileSvc.getSelectedNotifPeriod();
  }

  onNotifsClick() {
    this.openNotifSettings = !this.openNotifSettings;
  }

  onRadioChange(event) {
    this.selectedNotif = event.detail.value;
    this.profileSvc.setSelectedNotifPeriod(event.detail.value);
  }

  goToQuestions() {
    this.navCtrl.navigateRoot('/tab-root/tabs/questions');
  }

  gotToInvite() {
    this.profileSvc.setFromProfile(true);
    this.navCtrl.navigateRoot('/invite-friend');
  }

  logout() {
    this.storage.remove('user').then(() => {
  });
    this.profileSvc.setFromProfile(false);
    this.prepSvc.setFromPreps(false);
  }

  // onRadioSelect(event){
  //   console.log(event);
  // }

  isImage(e) {
    if (ProfilePage.isImageTaken) {
      if (e === 'avatar') {
        return 'centeralign';
      } else {
        return 'hide';
      }
    } else {
      return '';
    }
  }
}
