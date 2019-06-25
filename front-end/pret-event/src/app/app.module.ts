import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

//Component's imports
import { PlayerProfileComponent } from './screens/player-profile/player-profile.component';
import { NewEventComponent } from './screens/new-event/new-event.component';
import { HomeComponent } from './screens/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SignModalComponent } from './common/sign-modal/sign-modal.component';
import { FooterComponent } from './common/footer/footer.component';

//Bootstrap modules imports
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NewRewardComponent } from './screens/new-reward/new-reward.component';
import { SeeRewardComponent } from './screens/see-reward/see-reward.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertModule } from 'ngx-bootstrap/alert';
import { EventDetailComponent } from './screens/event-detail/event-detail.component';
import { RankingComponent } from './screens/ranking/ranking.component';
import { ListEventComponent } from './screens/list-event/list-event.component';
import { MyEventsComponent } from './screens/my-events/my-events.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    PlayerProfileComponent,
    HomeComponent,
    NavbarComponent,
    SignModalComponent,
    FooterComponent,
    NewEventComponent,
    NewRewardComponent,
    EventDetailComponent,
    SeeRewardComponent,
    RankingComponent,
    ListEventComponent,
    MyEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBCiLKQnG2Vi5o7QDNtbQOY86uXgF0xn_Y",
      authDomain: "playerphotoapi.firebaseapp.com",
      databaseURL: "https://playerphotoapi.firebaseio.com",
      projectId: "playerphotoapi",
      storageBucket: "playerphotoapi.appspot.com",
      messagingSenderId: "806478969886"
    }),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AlertModule.forRoot(),
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
