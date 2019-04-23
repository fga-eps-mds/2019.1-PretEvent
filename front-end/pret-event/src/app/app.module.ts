import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

//Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

//Component's imports
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    PlayerRegistrationComponent,
    PlayerProfileComponent
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
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
