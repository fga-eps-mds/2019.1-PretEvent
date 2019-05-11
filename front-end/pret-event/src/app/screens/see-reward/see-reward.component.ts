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

  typePassword = false;
  signup = false;
  rewardForm: FormGroup;
  selectedFiles: FileList;
  file: any;
  valid = true;
  rewards: Array<Reward> = [];
  rewardsNames: string[];
  clicked = false;
  title: string;

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
    
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0];
  }

  ngOnInit() {
    this.rewardForm = this.formBuilder.group({
      reward: '',
    });
  }

}
