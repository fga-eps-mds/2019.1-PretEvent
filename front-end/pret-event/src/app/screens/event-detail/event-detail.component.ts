import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { getId } from 'src/app/helpers/id';
import { getToken } from 'src/app/helpers/token';


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
  image: SafeStyle;
  currentId = +getId();
  logged = getToken() !== null;
  creatorId: number;
  checkCreator: boolean;

  
  constructor(private route: ActivatedRoute, private service: EventService, private sanitization:DomSanitizer) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getEventByid(params['id'])
      .then((event: Event) => {
        this.event = event;
        this.date = this.event.date;
        this.title = this.event.title;
        this.description = this.event.description;
        this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.event.url_image})`);
        this.creatorId = this.event.creator_id
      })
     
      .catch(error => console.log(error));
      });
      console.log(this.event);
      console.log(this.currentId);
  }

  setValues(){

  }

ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
