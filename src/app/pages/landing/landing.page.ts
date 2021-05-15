import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import {Storage} from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    public nav: NavController,
    private authSvc: AuthService,
    private storage: Storage,
    private translate: TranslateService,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private loadingController: LoadingController
    ) {
      translate.setDefaultLang('en');

      this.storage.get('user').then((user) => {
        // this.user = user;
        if (user) {
          console.log(user);
          this.authSvc.setUser(user);
          this.nav.navigateForward('/welcome');
        }
      });
  }

  ngOnInit() {

  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  // Google signin
  doGoogleLogin() {
    console.log("doGoogle Signin");
    this.googlePlus.login({})
    .then(res => {
      console.log("login result ===>", res);
    })
    .catch(err => {
      console.log("error occured====>", err);
    });
  }

  // Facebook signin
  async doFacebookLogin() {
    console.log("do Facebook Signin");
    const loading = await this.loadingController.create({
      message: "Please wait..."
    });
    this.presentLoading(loading);
    let permissions = new Array<string>();

    // Facebook App User Permissions
    permissions = ["public_profile", "email"];
    this.fb.login(permissions)
    .then(res => {
      console.log(res);
      let userId = res.authResponse.userID;
      this.fb.api("/me?fields=name,email", permissions)
      .then(user => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        // user.name, user.email and user.picture

      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
 }}
