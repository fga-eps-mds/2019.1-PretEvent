import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Upload } from '../models/upload';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  ref: any;
  task: any;
  downloadURL: any;
  url = '/api/players/';

  constructor(private http: HttpClient, private afStorage: AngularFireStorage) { }

  // GET - Traz da API uma lista com todos os players 
  getAllPlayers() {
    this.http.get<Player[]>('/api/players/')
      .subscribe(
        data => {
          // console.log(data);
          return data;
        },
        error => {
          console.log(error);
        }
      );
  }

  // GET - Busca na API um player pela sua ID
  getPlayer(id: number) {
    this.http.get<Player>('/api/players/' + id)
      .subscribe(
        data => {
          console.log(data);
          return data;
        },
        error => {
          console.log(error);
          return error;
        }
      );
  }

  // POST - Salva na API um registro de player
  postPlayer(player: Player) {
    this.http.post('api/players/', player)
      .subscribe(
        data => {
          console.log('Post Player: ' + data);
        },
        error => {
          console.log(error);
        }
      );
  }

  // Registrar o player - Sobe sua foto para o firebase e depois chama o metodo postPlayer
  registerPlayer(player: Player, file: any) {

    this.ref = this.afStorage.ref(player.university_id.toString());
    this.task = this.ref.put(file);

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(ref => {
          this.downloadURL = ref;
          player.photo_url = this.downloadURL;
          console.log('UploadPlayerPhoto: ' + this.downloadURL);
          this.postPlayer(player);
        });
      })
    ).subscribe();
  }
}
