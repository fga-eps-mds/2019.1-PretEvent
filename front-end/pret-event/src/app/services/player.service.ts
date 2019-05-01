import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  ref: any;
  task: any;
  downloadURL: any;
  url = '/api/players/';

  constructor(private http: HttpClient, private afStorage: AngularFireStorage) { }

  loginPlayer = player =>
    new Promise((resolve, reject) =>
      this.http.post('/rest-auth/login/', player)
        .subscribe(
          data => resolve(data),
          error => reject(error),
        )
    )

  postPlayer = (player: Player) =>
    new Promise((resolve, reject) =>
      this.http.post(this.url, player)
        .subscribe(
          data => resolve(data),
          error => reject(error),
        )
    )

  registerPlayer = (player: Player, file: any) =>
    new Promise(resolve => {
      this.ref = this.afStorage.ref(player.university_id.toString());
      this.task = this.ref.put(file);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(ref => {
            this.downloadURL = ref;
            player.photo_url = this.downloadURL;
            resolve(this.postPlayer(player));
          });
        })
      ).subscribe();
    })
}