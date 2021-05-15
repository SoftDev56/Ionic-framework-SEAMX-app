import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AllsetPageRoutingModule } from './allset-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AllsetPage } from './allset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllsetPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllsetPage]
})
export class AllsetPageModule {}
