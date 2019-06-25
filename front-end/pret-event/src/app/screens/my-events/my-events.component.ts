import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import { Event_Player } from '../../models/event_player';
import dateFormatter from 'src/helpers/dateFormatter';
import { getId } from 'src/app/helpers/id';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css'],
})

export class MyEventsComponent implements OnInit {

  events: Array<Event> = [];
  p_events: Array<Event> = [];
  my_events: Array<Event> = [];
  event_player: Array<Event_Player> = [];

  constructor(private service: EventService) { }

  ngOnInit() {
    this.service.getParticipations()
      .then((x: Array<Event_Player>) => {
        this.event_player = x;
        var aux = 0;
        for (var i = 0; i < this.event_player.length; i++) {
          if (this.event_player[i].player_id === +getId) {
            this.service.getEventByid(this.event_player[i].evento_id)
              .then((event: Event) => {
                this.p_events[aux] = event;
                aux++;
              });
          }
        }
      });

    this.service.getEvents()
      .then((x: Array<Event>) => {
        this.events = x;
        var aux = 0;
        for (var i = 0; i < this.events.length; i++) {
          if (this.events[i].creator_id === +getId) {
            this.service.getEventByid(this.events[i].id)
              .then((event: Event) => {
                this.my_events[aux] = event;
                aux++;
              });
          }
        }
      });
  }
}