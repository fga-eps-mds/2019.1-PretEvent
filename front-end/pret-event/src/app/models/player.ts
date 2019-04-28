export class Player {
    id: number;
    name: string;
    university_id: number;
    points: number;
    photo_url: string;

    constructor(name: string, university_id: number, points: number, photo_url?: string) {
        this.name = name;
        this.university_id = university_id;
        this.points = points;
        this.photo_url = photo_url;
    }
}
