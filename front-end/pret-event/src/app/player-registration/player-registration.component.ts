import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css']
})
export class PlayerRegistrationComponent implements OnInit {

  playerForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private service: PlayerService) { }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      name: '',
      university_id: ''
    });
  }

  registerPlayer() {
    const player: Player = new Player(
      this.playerForm.get('name').value,
      this.playerForm.get('university_id').value,
      0,
      'www');
    console.log(player);
    this.service.postPlayer(player);
  }

}
