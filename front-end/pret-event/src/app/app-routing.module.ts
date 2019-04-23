import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';

const routes: Routes = [
  { path: 'registro', component: PlayerRegistrationComponent },
  { path: 'perfil', component: PlayerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
