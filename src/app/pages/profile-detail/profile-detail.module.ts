import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailPageRoutingModule } from './profile-detail-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileDetailPage } from './profile-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [ProfileDetailPage]
})
export class ProfileDetailPageModule {}
