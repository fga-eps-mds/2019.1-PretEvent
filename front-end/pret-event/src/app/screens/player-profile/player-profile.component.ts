import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from '../../models/player';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  private sub: any;
  player: Player;

  constructor(private route : ActivatedRoute, private service: PlayerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getPlayerid(params['id'])
      .then((player: Player) => {
        console.log(player);
        this.player = player;
      })
      .catch(error => console.log(error));
    });
  }

}
