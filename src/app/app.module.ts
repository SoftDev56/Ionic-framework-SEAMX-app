import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PhotoGalleryPageModule } from './pages/photo-gallery/photo-gallery.module';
import { CongratsPageModule } from './pages/congrats/congrats.module';
import { environment } from '../environments/environment';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { IonicStorageModule } from '@ionic/storage';

import { FCM } from '@ionic-native/fcm/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    PhotoGalleryPageModule,
    CongratsPageModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    FCM,
    DatePipe,
    GooglePlus,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
