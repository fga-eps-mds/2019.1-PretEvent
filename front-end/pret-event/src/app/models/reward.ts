export class Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  // tslint:disable-next-line: variable-name
  badge_url: string;

  constructor(title: string, description: string, points: number, photoUrl?: string) {
    this.title = title;
    this.description = description;
    this.points = points;
    this.badge_url = photoUrl || '';
  }
}
