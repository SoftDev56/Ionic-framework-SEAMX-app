import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRootPageRoutingModule } from './tab-root-routing.module';

import { TabRootPage } from './tab-root.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRootPageRoutingModule,
    TranslateModule
  ],
  declarations: [TabRootPage]
})
export class TabRootPageModule {}
