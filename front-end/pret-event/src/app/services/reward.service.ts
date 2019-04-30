import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Reward } from '../models/reward';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  ref: any;
  task: any;
  downloadURL: any;
  url = '/api/rewards/';

  constructor(private http: HttpClient, private afStorage: AngularFireStorage) { }

  getRewards = () =>
    new Promise((resolve, reject) =>
      this.http.get<Reward[]>(this.url)
        .subscribe(
          data => resolve(data),
          error => reject(error),
        )
    )

  postReward = (reward: Reward) =>
    new Promise((resolve, reject) =>
      this.http.post(this.url, reward)
        .subscribe(
          data => resolve(data),
          error => reject(error),
        )
    )

  registerReward = (reward: Reward, file: any) =>
    new Promise(resolve => {
      this.ref = this.afStorage.ref(reward.title.toString());
      this.task = this.ref.put(file);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(ref => {
            this.downloadURL = ref;
            reward.badge_url = this.downloadURL;
            resolve(this.postReward(reward));
          });
        })
      ).subscribe();
    })
}
