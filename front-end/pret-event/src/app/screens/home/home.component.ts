import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  event: Event;
  events: Array<Event> = [];
  data: Array<Event> = [];
  columns = Array(0, 1, 2, 3);
  rows = [];
  mainEvents = [];
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: EventService) {
    this.searchForm = this.formBuilder.group({
      search: ''
    });
  
    this.onChanges();
  }

  onChanges(): void {
    this.searchForm
      .get('search')
      .valueChanges
      .subscribe(val => {
        this.events = this.data.filter(event => event.title.includes(val));
      });
  }

  ngOnInit() {
    this.service.getEvents()
      .then((data: Array<Event>) => {
        this.data = data;
        this.events = this.data;
        this.mainEvents = this.events.slice(0, 3);
      });
  }
}
