import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorDetailPageRoutingModule } from './sponsor-detail-routing.module';

import { SponsorDetailPage } from './sponsor-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SponsorDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [SponsorDetailPage]
})
export class SponsorDetailPageModule {}
