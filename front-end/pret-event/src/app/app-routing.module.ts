import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { PlayerProfileComponent } from './screens/player-profile/player-profile.component';
import { NewEventComponent } from './screens/new-event/new-event.component';
import { NewRewardComponent } from './screens/new-reward/new-reward.component';
import { EventDetailComponent } from './screens/event-detail/event-detail.component';
import { SeeRewardComponent } from './screens/see-reward/see-reward.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'perfil', component: PlayerProfileComponent },
  { path: 'evento/criar', component: NewEventComponent },
  { path: 'recompensa/criar', component: NewRewardComponent },
  { path: 'evento/:id', component: EventDetailComponent},
  { path: 'recompensa/visualizar', component: SeeRewardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
