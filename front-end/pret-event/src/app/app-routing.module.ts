import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';

const routes: Routes = [
  { path: 'registro', component: PlayerRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
