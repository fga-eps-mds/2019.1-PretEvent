import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { Reward } from '../../models/reward';
import { Alert } from '../../models/alert';
import { EventService } from '../../services/event.service';
import { RewardService } from '../../services/reward.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: { formated: any; id: number; title: string; date: string; points: number; description: string; url_image: string; reward_id: number; }[];
  service: any;

  constructor() { }

  ngOnInit() {
    this.service.getEvent()
      .then((x: Event) => {
        
      });
  
  }

}
