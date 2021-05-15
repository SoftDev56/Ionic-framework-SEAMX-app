import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CameraPageRoutingModule } from './camera-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CameraPage } from './camera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPageRoutingModule,
    TranslateModule
  ],
  declarations: [CameraPage]
})
export class CameraPageModule {}
