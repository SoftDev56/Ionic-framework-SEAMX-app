import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SponsorDetailPage } from './sponsor-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SponsorDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorDetailPageRoutingModule {}
