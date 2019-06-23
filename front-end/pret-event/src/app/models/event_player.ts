export class Event_Player {
    id: number;
    evento_id: number;
    player_id: number;
  
    constructor(evento_id: number, player_id: number) {
      this.evento_id = evento_id;
      this.player_id = player_id;
    }
  }
  