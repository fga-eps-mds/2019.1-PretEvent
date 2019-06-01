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
  university_id: any;
  photo_url: any;
  id: any;

  constructor(private route : ActivatedRoute, private service: PlayerService, private sanitization: DomSanitizer) {
    this.sub = this.route.params.subscribe(params => {
      this.service.getPlayerid(params['id'])
      .then((player: Player) => {
        this.player = player;
        this.id = this.player.id;
        this.username = this.player.username;
        this.points = this.player.points;
        this.university_id = this.player.university_id;
        this.photo_url = this.player.photo_url;
      })
      .catch(error => console.log(error));
    });
   }

  ngOnInit() {
    


  }
}
