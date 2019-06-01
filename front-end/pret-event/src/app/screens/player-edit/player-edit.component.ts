import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormGroup, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  private sub: any;
  player: Player;

  playerForm: FormGroup;
  isLoadingResults = false;
  clicked = false;
  id = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: PlayerService,
  ) { }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      username: '',
      university_id: 0,
      points: 0,
      password: '',
      photo_url: '',
    })
    this.sub = this.route.params.subscribe(params => {
      this.service.getPlayerid(params['id'])
        .then((player: Player) => {
          this.playerForm.setValue({
            username: player.username,
            university_id: player.university_id,
            points: player.points,
            password: player.password,
            photo_url: player.photo_url
          });
          this.id = player.id;
        })
        .catch(error => console.log(error));
    });
  }

  updatePlayer(form: NgForm) {
    this.isLoadingResults = true;
    this.service.updatePlayer({
      username: this.playerForm.get('username').value,
      university_id: this.playerForm.get('university_id').value,
      points: this.playerForm.get('points').value,
      password: this.playerForm.get('password').value,
      photo_url: this.playerForm.get('photo_url').value,
      id: this.id
    })
      .then(red => {
        console.log(red)
      });
  }
}
