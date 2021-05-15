import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { ProfileService } from '../../services/profile.service';
import {Storage} from '@ionic/storage';
import { ProfilePage } from '../profile/profile.page';
import { ProfileDetailPage } from '../profile-detail/profile-detail.page';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  options: CameraOptions;
  profileImage: string;
  imageData: string;
  win: any = window;
  user: any;
  // @Input()
  // navToggle: boolean;

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private profileSvc: ProfileService,
    private storage: Storage
    ) {
      this.user = this.authSvc.getUser();

      this.profileImage = '';

      this.options = {
        quality: 80,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
  }

  ngOnInit() {
    // if (this.user.image) {
    //   console.log(this.user.image);
    //   this.navCtrl.navigateForward('/tab-root');
    // }
  }

  getPhoto() {
    this.camera.getPicture(this.options).then((imageUri) => {
      // console.log('Image URI: ', imageUri);
      this.imageData = imageUri;
      this.profileImage = this.win.Ionic.WebView.convertFileSrc(imageUri);
      // console.log(this.profileImage);

      // this.profileImage = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
        console.log('Error getting photo: ', err);
     });
  }

  openCamera() {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.getPhoto();
  }

  openLibrary() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.getPhoto();
  }

  discard() {
    this.profileImage = '';
    if (this.profileSvc.getNavToggle() === 'true') {
      this.navCtrl.navigateForward('/profile-detail');
    }
  }

  save() {
    const user = this.authSvc.getUser();
    // console.log('imageData: '+ this.imageData);
    if (this.imageData) {
      this.apiSvc.updateUserImage(user.userId, this.imageData).then((res) => {
        // console.log(res);
        if (res) {
          user.image = res.response;
          this.authSvc.setUser(user);
          this.storage.remove('user').then(() => {});
          this.storage.set('user', user).then(() => {});
          ProfileDetailPage.isImageTaken = true;
          ProfilePage.isImageTaken = true;
        }
      });
    }
    if (this.profileSvc.getNavToggle() === 'true') {
      this.navCtrl.navigateForward('/profile-detail');
    } else {
      this.navCtrl.navigateForward('/prep-start');
    }
  }

}
