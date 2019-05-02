import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/reward.service';

@Component({
  selector: 'app-new-reward',
  templateUrl: './new-reward.component.html',
  styleUrls: ['./new-reward.component.css']
})
export class NewRewardComponent implements OnInit {

  typePassword = false;
  signup = false;
  rewardForm: FormGroup;
  selectedFiles: FileList;
  file: any;
  valid = true;
  clicked = false;

  constructor(private formBuilder: FormBuilder, private service: RewardService) { }

  registerReward() {
    this.clicked = true;
    const reward: Reward = new Reward(
      this.rewardForm.get('name').value,
      this.rewardForm.get('description').value,
      this.rewardForm.get('points').value,
    );
    this.service.registerReward(reward, this.file)
      .then(x => {
        console.log(x);
        this.clicked = false;
      })
      .catch(x => {
        console.log(x);
        this.clicked = false;
      });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0];
  }

  ngOnInit() {
    this.rewardForm = this.formBuilder.group({
      name: '',
      description: '',
      points: 0,
    });
  }

}
