export class Event {
  id: number;
  title: string;
  date: string;
  points: number;
  description: string;
  // tslint:disable-next-line: variable-name
  url_image: string;
  // tslint:disable-next-line: variable-name
  reward_id: number;
  creator_id: number;

  constructor(title: string, date: string, time: string, points: number, description: string, rewardId: number, creatorId: number, photoUrl?: string) {
    this.title = title;
    this.date = date + "T" + time;
    this.points = points;
    this.description = description;
    this.url_image = photoUrl || '';
    this.reward_id = rewardId;
    this.creator_id = creatorId;
  }
}
