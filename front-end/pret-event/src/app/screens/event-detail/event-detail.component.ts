import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import { Event_Player } from '../../models/event_player';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { getId } from 'src/app/helpers/id';
import { getToken } from 'src/app/helpers/token';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/reward.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  rwrd_id: number;
  rwrd_img: string;
  rwrd_name: string;
  reward: Reward;
  event: Event;
  date: string;
  place: string;
  time: string;
  title: string;
  description: string;
  image: SafeStyle;
  currentId = +getId();
  logged = getToken() !== null;
  creatorId: number;
  event_player: Event_Player;
  evento_id: number;
  player_id: number;
  participations: Array<Event_Player> = [];
  global_id: number;
  participate: boolean = false;
  player: Player;
  username: string;
  photo_url: string;
  player_participating: Array<Player> = [];


  constructor(private route: ActivatedRoute,private rewardservice: RewardService, private service: EventService, private playerservice: PlayerService, private sanitization:DomSanitizer) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getEventByid(params['id'])
      .then((event: Event) => {
        this.event = event;
        this.date = this.event.date;
        this.place = this.event.place;
        this.title = this.event.title;
        this.description = this.event.description;
        this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.event.url_image})`);
        this.creatorId = this.event.creator_id;
        this.evento_id = this.event.id;
        this.rwrd_id = this.event.reward_id;
        this.rewardservice.getRewardById(this.rwrd_id)
        .then((reward: Reward) => {
          this.reward = reward;
          this.rwrd_name = this.reward.description;
          this.rwrd_img = this.reward.badge_url;
        }
        );
      })
      .catch(error => console.log(error));
    });

    this.service.getParticipations()
    .then((x: Array<Event_Player>) => {
      this.participations = x
      for(var i = 0; i < this.participations.length; i++){
        if (this.participations[i].player_id === this.currentId &&
           this.participations[i].evento_id === this.event.id){
             this.participate = true;
             this.global_id = this.participations[i].id;
          }

      }
      var m = 0;
      for(var z = 0; z < this.participations.length; z++){
          if(this.participations[z].evento_id === this.event.id){
            this.playerservice.getPlayerid(this.participations[z].player_id)
            .then((x: Player) => {
              this.player_participating[m] = x;
              m++;
          });
        }
      }
    });

  }

  Participar() {
    const event_player: Event_Player = new Event_Player(
      this.evento_id,
      this.currentId,
    );
    this.service.participateEvent(event_player)
    .then(x => {
      console.log(x);
    });
    console.log(event_player);
  }

  Deletar() {
    this.service.removeParticipation(this.global_id)
    .then(x => {
      console.log(x);
    });
  }

ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
