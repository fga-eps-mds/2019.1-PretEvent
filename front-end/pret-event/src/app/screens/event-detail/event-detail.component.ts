import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  event: Event;
  
  constructor(private route: ActivatedRoute, private service: EventService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getEventByid(params['id'])
      .then((event: Event) => {
        console.log(event);
        this.event = event;
      })
      .catch(error => console.log(error));
      });
  }
  
ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
