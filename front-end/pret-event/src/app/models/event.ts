export class Event {
    id: number;
    title: string;
    date: string;
    points: number;
    description: string;
    // tslint:disable-next-line: variable-name
    url_image: string;
  
    constructor(title: string, date: string, points: number, description: string, photoUrl?: string) {
      this.title = title;
      this.date = date;
      this.points = points;
      this.description = description;
      this.url_image = photoUrl || '';
    }
  }