import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepsPage } from './preps.page';

const routes: Routes = [
  {
    path: '',
    component: PrepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepsPageRoutingModule {}
