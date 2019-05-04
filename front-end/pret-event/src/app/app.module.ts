import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


//Bootstrap modules imports
import { HomeComponent } from './screens/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SignModalComponent } from './common/sign-modal/sign-modal.component';
import { FooterComponent } from './common/footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NewRewardComponent } from './screens/new-reward/new-reward.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [
    AppComponent,
    PlayerProfileComponent,
    HomeComponent,
    NavbarComponent,
    SignModalComponent,
    FooterComponent,
    NewEventComponent,
    NewRewardComponent
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
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
