import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  url = '/api/players/';

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
  postPlayer(player: Player){
    this.http.post('api/players/', player)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
