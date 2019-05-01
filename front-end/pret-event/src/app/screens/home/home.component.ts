import { Component, OnInit } from '@angular/core';
import dateFormatter from 'src/helpers/dateFormatter';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: Array<Event> = [];
  columns = Array(0, 1, 2, 3);
  rows = [];
  mainEvents = [];

  constructor(private service: EventService) { }

  ngOnInit() {
    this.service.getEvents()
      .then((x: Array<Event>) => {
        this.events = x.map(event => ({ ...event, formated: dateFormatter(event.date) }));
        this.mainEvents = this.events.slice(0, 3);
        this.rows = this.events.slice(0, (this.events.length / 4) + 1).map((_d, i) => i);
      });
  }
}