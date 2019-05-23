import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import { ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  event: Event;
  date: string = '1234';
  title: string;
  description: string;
  url: string;
  
  constructor(private route: ActivatedRoute, private service: EventService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getEventByid(params['id'])
      .then((event: Event) => {
        console.log(event);
        this.event = event;
        console.log(event.date)
        this.date = this.event.date;
        this.title = this.event.title
        this.description = this.event.description
        this.url = this.event.url_image;
        console.log(this.date)
      })
      .catch(error => console.log(error));
      });
  }

  setValues(){

  }

ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
