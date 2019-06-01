import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {

  players: Array<Player> = [];

  constructor(private service: PlayerService) { }

  ngOnInit() {
    this.service.getPlayers()
      .then((x: Array<Player>) => {
        this.players = x;
      });
  }
}