import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllsetPage } from './allset.page';

const routes: Routes = [
  {
    path: '',
    component: AllsetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllsetPageRoutingModule {}
