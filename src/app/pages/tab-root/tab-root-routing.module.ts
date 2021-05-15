import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabRootPage } from './tab-root.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabRootPage,
    children: [
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('../questions/questions.module').then( m => m.QuestionsPageModule)
      },
      {
        path: 'preps',
        loadChildren: () => import('../preps/preps.module').then( m => m.PrepsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'photo-gallery',
        loadChildren: () => import('../photo-gallery/photo-gallery.module').then( m => m.PhotoGalleryPageModule)
      }            
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/events'
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRootPageRoutingModule {}
