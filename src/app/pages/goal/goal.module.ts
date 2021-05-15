import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalPageRoutingModule } from './goal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { GoalPage } from './goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalPageRoutingModule,
    TranslateModule
  ],
  declarations: [GoalPage]
})
export class GoalPageModule {}
