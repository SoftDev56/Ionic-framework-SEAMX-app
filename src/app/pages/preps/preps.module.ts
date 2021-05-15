import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepsPageRoutingModule } from './preps-routing.module';

import { PrepsPage } from './preps.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PrepsPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    PrepsPage   
  ]
})
export class PrepsPageModule {}
