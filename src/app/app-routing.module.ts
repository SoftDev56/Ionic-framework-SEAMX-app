import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab-root',
    loadChildren: () => import('./pages/tab-root/tab-root.module').then( m => m.TabRootPageModule)
  },
  {
    path: 'goal',
    loadChildren: () => import('./pages/goal/goal.module').then( m => m.GoalPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./pages/camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'prep-start',
    loadChildren: () => import('./pages/prep-start/prep-start.module').then( m => m.PrepStartPageModule)
  },
  {
    path: 'invite-friend',
    loadChildren: () => import('./pages/invite-friend/invite-friend.module').then( m => m.InviteFriendPageModule)
  },
  {
    path: 'allset',
    loadChildren: () => import('./pages/allset/allset.module').then( m => m.AllsetPageModule)
  },
  {
    path: 'profile-detail',
    loadChildren: () => import('./pages/profile-detail/profile-detail.module').then( m => m.ProfileDetailPageModule)
  },
  {
    path: 'sponsor-detail',
    loadChildren: () => import('./pages/sponsor-detail/sponsor-detail.module').then( m => m.SponsorDetailPageModule)
  },
  {
    path: 'congrats',
    loadChildren: () => import('./pages/congrats/congrats.module').then( m => m.CongratsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
