import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import dateFormatter from 'src/helpers/dateFormatter';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
})
export class ListEventComponent implements OnInit {

  events: Array<Event> = [];

  constructor(private service: EventService) { }

  ngOnInit() {
    this.service.getEvents()
      .then((x: Array<Event>) => {
        this.events = x.filter(item => {
          var today = new Date();
          var eventDate = new Date(item.date);
          return +eventDate >= +today;
        });
      });
  }
}