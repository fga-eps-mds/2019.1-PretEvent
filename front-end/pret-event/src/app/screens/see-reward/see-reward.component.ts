import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/reward.service';

@Component({
  selector: 'app-see-reward',
  templateUrl: './see-reward.component.html',
  styleUrls: ['./see-reward.component.css']
})
export class SeeRewardComponent implements OnInit {

  rewardForm: FormGroup;
  rewards: Array<Reward> = [];
  rewardsNames: string[];
  clicked = false;
  title: string;
  description: string;
  points: any;
  badge_url: string;

  selected: string;

  constructor(
    private formBuilder: FormBuilder,
    private rewardService: RewardService
  ) {
    this.rewardService.getRewards().then((rewards: Reward[]) => {
      this.rewards = rewards;
      this.rewardsNames = rewards.map(r => r.title);
    }).catch(error => console.log(error));
  }

  GetReward() {
    this.clicked = true;
    const reward = this.rewards.find(r => r.title == this.selected);
    if(!reward) { this.clicked = false; return; }
    this.title = reward.title;
    this.description = reward.description;
    this.points = reward.points;
    this.badge_url = reward.badge_url;
  }

  ngOnInit() {
    this.rewardForm = this.formBuilder.group({
      reward: '',
    });
  }

}
