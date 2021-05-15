import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PrepSliderComponent } from './prep-slider/prep-slider.component';
import { PrepCardComponent } from './prep-card/prep-card.component';

@NgModule({
 
  imports: [IonicModule, CommonModule, TranslateModule],
  declarations: [PrepSliderComponent, PrepCardComponent],
  exports: [PrepSliderComponent, PrepCardComponent]
})
export class ComponentsModule {}