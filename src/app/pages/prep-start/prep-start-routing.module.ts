import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepStartPage } from './prep-start.page';

const routes: Routes = [
  {
    path: '',
    component: PrepStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepStartPageRoutingModule {}
