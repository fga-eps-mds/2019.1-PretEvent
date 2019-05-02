import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Event } from '../../models/event';
import { Reward } from '../../models/reward';
import { EventService } from '../../services/event.service';
import { RewardService } from '../../services/reward.service';


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

  selected: string;

  constructor(private formBuilder: FormBuilder, private service: EventService, private rewardService: RewardService) {
    this.rewardService.getRewards().then((rewards: Reward[]) => {
      this.rewards = rewards;
      this.rewardsNames = rewards.map(r => r.title);
    }).catch(error => console.log(error));
  }

  registerEvent() {
    this.clicked = true;
    const reward = this.rewards.find(r => r.title === this.selected);
    if (!reward) { this.clicked = false; return; };
    const event: Event = new Event(
      this.eventForm.get('name').value,
      this.eventForm.get('date').value,
      0,
      this.eventForm.get('description').value,
      reward.id,
    );
    this.service.registerEvent(event, this.file).then(x => {
      console.log(x);
      this.clicked = false;
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
      reward: '',
    });
  }

}
