export class Event {
    id: number;
    title: string;
    date: string;
    points: number;
    description: string;
    // tslint:disable-next-line: variable-name
    url_image: string;
    reward_id: number;

    constructor(title: string, date: string, points: number, description: string, rewardId: number, photoUrl?: string) {
      this.title = title;
      this.date = date;
      this.points = points;
      this.description = description;
      this.url_image = photoUrl || '';
      this.reward_id = rewardId;
    }
  }
