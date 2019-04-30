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
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { NewEventComponent } from './new-event/new-event.component';

//Bootstrap modules imports
import { HomeComponent } from './screens/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SignModalComponent } from './common/sign-modal/sign-modal.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    AppComponent,
    PlayerRegistrationComponent,
    PlayerProfileComponent,
    HomeComponent,
    NavbarComponent,
    SignModalComponent,
    FooterComponent,
    NewEventComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
