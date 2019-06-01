import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { PlayerProfileComponent } from './screens/player-profile/player-profile.component';
import { NewEventComponent } from './screens/new-event/new-event.component';
import { NewRewardComponent } from './screens/new-reward/new-reward.component';
import { PlayerEditComponent } from './screens/player-edit/player-edit.component'
import { EventDetailComponent } from './screens/event-detail/event-detail.component';
import { SeeRewardComponent } from './screens/see-reward/see-reward.component';
import { RankingComponent } from './screens/ranking/ranking.component';
import { ListEventComponent } from './screens/list-event/list-event.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'perfil/:id', component: PlayerProfileComponent },
  { path: 'perfil/editar/:id', component: PlayerEditComponent },
  { path: 'evento/criar', component: NewEventComponent },
  { path: 'recompensa/criar', component: NewRewardComponent },
  { path: 'evento/:id', component: EventDetailComponent},
  { path: 'recompensa/visualizar', component: SeeRewardComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'evento', component: ListEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
