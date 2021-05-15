import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepStartPageRoutingModule } from './prep-start-routing.module';

import { PrepStartPage } from './prep-start.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    ComponentsModule,
    PrepStartPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    PrepStartPage
  ]
})
export class PrepStartPageModule {}
