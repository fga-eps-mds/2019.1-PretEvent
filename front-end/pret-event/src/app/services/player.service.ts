import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Player } from '../models/player';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  ref: any;
  task: any;
  downloadURL: any;

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
      this.http.post('/api/players/', player)
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

    updatePlayer = (player: { id: number, username: string, university_id: number }) =>
    new Promise((resolve, reject) =>
      this.http.put(`/api/players/${player.id}`, player)
      .subscribe(
        data => resolve(data),
        error => reject(error),
      )
  )

  getPlayerid = id =>
    new Promise((resolve, reject) =>
      this.http.get<Player>(`/api/players/${id}`)
        .subscribe(
          data => resolve(data),
          error => reject(error),
        )
    )
}