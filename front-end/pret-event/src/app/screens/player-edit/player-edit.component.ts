import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  private sub: any;
  player: Player;

  id: String = '';
  playerForm: FormGroup;
  username: String = '';
  photo_url: String = '';
  points: Number = 0;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: PlayerService,
    ) { }

  ngOnInit() {
    this.getPlayerid(this.router.snapshot.params['id']);
    this.playerForm = this.formBuilder.group({
   'username' : [null],
   'photo_url' : [null],
   'points' : [null]
 });
  }

  getPlayerid(id) {
    this.player.getPlayerid(id).subscribe(data => {
      this.id = data.id;
      this.playerForm.setValue({
        username: data.username,
        photo_url: data.photo_url,
        points: data.points
      });
    });
  }

  updatePlayer(form: NgForm) {
    this.isLoadingResults = true;
    this.player.updatePlayer(this.id, form)
      .subscribe(red => {
        this.isLoadingResults = false;
        this.router.navigate(['/perfil/' + this.id]);
      });
  }

}
