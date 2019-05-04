import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/reward.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-new-reward',
  templateUrl: './new-reward.component.html',
  styleUrls: ['./new-reward.component.css']
})
export class NewRewardComponent implements OnInit  {

  typePassword = false;
  signup = false;
  rewardForm: FormGroup;
  selectedFiles: FileList;
  file: any;
  valid = true;
  clicked = false;
  submitted = false;

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
      name: new FormControl('', Validators.required),     
       description: new FormControl('', Validators.required),
      points: 0,
    });
  }
  alerts: any[] = [{
    
  }];

  get f() { return this.rewardForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.rewardForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)')
}

 
  add(): void {
    this.alerts.push({
      type: 'info',
      msg: `Campos invalidos`,
      timeout: 5000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  


}
