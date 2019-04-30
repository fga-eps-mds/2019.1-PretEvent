import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { NewEventComponent } from './new-event/new-event.component';
import { NewRewardComponent } from './screens/new-reward/new-reward.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'perfil', component: PlayerProfileComponent },
  { path: 'evento/criar', component: NewEventComponent },
  { path: 'recompensa/criar', component: NewRewardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
