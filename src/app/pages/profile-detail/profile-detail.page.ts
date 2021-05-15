import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';
import { ProfileService } from '../../services/profile.service';
import { Storage } from "@ionic/storage";
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {

  user: User;
  username: string;

  changedName: string;
  changedEmail: string;

  isEditName: boolean;
  isEditEmail: boolean;

  static isImageTaken: boolean = false;

  constructor(
    public navCtrl: NavController,
    private authSvc: AuthService,
    public apiSvc: ApiService,
    private profileSvc: ProfileService,
    private storage: Storage) {

    this.isEditName = true;
    this.isEditEmail = true;

    this.user = new User();
    this.user.image = 'assets/img/profile.jpg';
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user = this.authSvc.getUser();
    if (!this.user.image.startsWith('http')) {
      this.user.image = environment.baseUrl + this.user.image;
    }
    this.username = this.user.firstname + ' ' + this.user.lastname;
    this.changedName = this.username;
    this.changedEmail = this.user.emailAddress;
  }

  editName() {
    this.isEditName = !this.isEditName;
    if (this.username !== this.changedName) {
      const firstname = this.changedName.split(' ')[0];
      const lastname = this.changedName.split(' ')[1];
      this.apiSvc.updateUserName(this.user.userId, firstname, lastname).subscribe(res => {
        if (res === 'ok') {
          this.user.firstname = firstname;
          this.user.lastname = lastname;
          this.authSvc.setUser(this.user);
          this.storage.remove('user').then(() => { });
          this.storage.set('user', this.user).then(() => { });
        }
      });
    }
  }
  onNameInput(e) {
    this.changedName = e.target.value;
  }

  editEmail() {
    this.isEditEmail = !this.isEditEmail;
    if (this.user.emailAddress !== this.changedEmail) {
      this.apiSvc.updateUserEmail(this.user.userId, this.changedEmail).subscribe(res => {
        if (res === 'ok') {
          this.user.emailAddress = this.changedEmail;
          this.authSvc.setUser(this.user);
          this.storage.remove('user').then(() => { });
          this.storage.set('user', this.user).then(() => { });
        }
      });
    }
  }
  onEmailInput(e) {
    this.changedEmail = e.target.value;
  }

  goToCamera() {
    this.profileSvc.setNavToggle('true');
    this.navCtrl.navigateRoot('/camera');
  }

  isImage(e) {
    if (ProfileDetailPage.isImageTaken) {
      if (e === 'avatar') {
        return 'centeralign';
      } else if (e === 'ch-avatar') {
        return 'ch-avatar';
      } else {
        return 'hide';
      }
    } else {
      return '';
    }
  }

}
