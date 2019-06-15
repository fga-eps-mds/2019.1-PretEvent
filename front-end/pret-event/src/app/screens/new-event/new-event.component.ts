import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { Reward } from '../../models/reward';
import { Player } from '../../models/player';
import { Alert } from '../../models/alert';
import { EventService } from '../../services/event.service';
import { RewardService } from '../../services/reward.service';
import { AlertService } from 'src/app/services/alert.service';
import { PlayerService } from '../../services/player.service';
import { getId } from 'src/app/helpers/id';
import { validateEvent } from '../../../helpers/validators';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  typePassword = false;
  signup = false;
  eventForm: FormGroup;
  selectedFiles: FileList;
  file: any;
  valid = true;
  rewards: Array<Reward> = [];
  rewardsNames: string[];
  clicked = false;
  player: Player;
  currentId = +getId();

  selected: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: EventService,
    private rewardService: RewardService,
    private router: Router,
    private data: AlertService
  ) {
    this.rewardService.getRewards().then((rewards: Reward[]) => {
      this.rewards = rewards;
      this.rewardsNames = rewards.map(r => r.title);
    }).catch(error => console.log(error));
  }

  registerEvent() {
    this.clicked = true;
    const reward = this.rewards.find(r => r.title === this.selected);
    if (!reward) {
      this.data.addAlert(new Alert('danger', 'Recompensa inválida!', 3000));
      this.clicked = false;
      return;
    }
    if (this.eventForm.get('time').value === '') {
      this.data.addAlert(new Alert('danger', 'Hora inválida!', 3000));
      this.clicked = false;
      return;
    }
    const event: Event = new Event(
      this.eventForm.get('name').value,
      this.eventForm.get('date').value,
      this.eventForm.get('place').value,
      this.eventForm.get('time').value,
      0,
      this.eventForm.get('description').value,
      this.currentId,
      reward.id,
    );

    const valid = validateEvent(event, this.file);
    if (valid) {
      this.data.addAlert(new Alert('danger', valid, 3000));
      this.clicked = false;
      return;
    }

    this.service.registerEvent(event, this.file).then(x => {
      console.log(x);
      this.data.addAlert(new Alert('success', 'Evento cadastrado!', 3000));
      this.clicked = false;
      this.router.navigate(['']);
    }).catch(x => {
      console.log(x);
      this.clicked = false;
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0];
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: '',
      description: '',
      date: '',
      place: '',
      time: '',
      reward: '',
    });
  }

}
