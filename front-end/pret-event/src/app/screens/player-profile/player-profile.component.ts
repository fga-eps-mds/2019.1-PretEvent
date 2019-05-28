import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from '../../models/player';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  private sub: any;
  player: Player;
  username: string;
  points: any;
  photo_url: SafeStyle;

  constructor(private route : ActivatedRoute, private service: PlayerService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getPlayerid(params['id'])
      .then((player: Player) => {
        this.player = player;
        this.username = this.player.username;
        this.points = this.player.points;
        this.photo_url = this.sanitization.bypassSecurityTrustStyle(`url(${this.player.photo_url})`);
      })
      .catch(error => console.log(error));
    });
  }

}
