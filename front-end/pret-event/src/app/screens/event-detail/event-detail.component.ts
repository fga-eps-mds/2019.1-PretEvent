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
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/app/models/alert';
import { Router } from '@angular/router';

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
  totalParticipations: number;
  ownerName: string;
  ownerImgUrl: string;
  owner: Player;
  clicked = false;

  constructor(private route: ActivatedRoute, private rewardservice: RewardService, private service: EventService, private playerservice: PlayerService, private sanitization: DomSanitizer, private data: AlertService, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init() {
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
          this.totalParticipations = this.player_participating.length;
          this.playerservice.getPlayerid(this.creatorId)
            .then((owner: Player) => {
              this.owner = owner;
              this.ownerImgUrl = this.owner.photo_url;
              this.ownerName = this.owner.username;
            });
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
        this.participations = x;
        let m = 0;

        const hasParticipation = this.participations.find(participation => {
          return participation.player_id === +getId() && participation.evento_id === this.event.id;
        });

        if (hasParticipation) {
          this.participate = true;
          this.global_id = hasParticipation.id;
        }

        const playersParticipation = this.participations.filter(participation => participation.evento_id === this.event.id);
        (playersParticipation || []).map(participation => {
          this.playerservice.getPlayerid(participation.player_id)
            .then((x: Player) => {
              this.player_participating[m] = x;
              m++;
            });
        });
      });
  }

  Participar() {
    const event_player: Event_Player = new Event_Player(
      this.evento_id,
      this.currentId,
    );
    this.service.participateEvent(event_player)
      .then(x => {
        this.init();
        this.data.addAlert(new Alert('success', 'Participação confirmada!', 3000));
      });
  }

  Deletar() {
    this.service.removeParticipation(this.global_id)
      .then(x => {
        this.init();
        this.router.navigate(['']);
        this.data.addAlert(new Alert('success', 'Participação cancelada!', 3000));
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
