import { Component, OnInit, OnDestroy } from '@angular/core';
import dateFormatter from 'src/helpers/dateFormatter';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }


ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
