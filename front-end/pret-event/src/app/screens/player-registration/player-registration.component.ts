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
  selectedFiles: FileList;
  file: any;

  constructor(private formBuilder: FormBuilder, private service: PlayerService) { }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      name: '',
      lastname: '',
      university_id: ''
    });
  }

  registerPlayer() {
    const player: Player = new Player(
      this.playerForm.get('name').value + ' ' + this.playerForm.get('lastname').value,
      this.playerForm.get('university_id').value,
      0
    );

    // console.log("RegisterPlayer:" + player);
    this.service.registerPlayer(player, this.file);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0];
}

}
