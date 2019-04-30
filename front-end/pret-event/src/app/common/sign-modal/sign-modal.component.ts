import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from '../../models/player';
import { User } from '../../models/user';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-sign-modal',
  templateUrl: './sign-modal.component.html',
  styleUrls: ['./sign-modal.component.css']
})
export class SignModalComponent implements OnInit {

  @Input() login: any;
  @Input() hideModal: any;

  typePassword = false;
  signup = false;
  playerForm: FormGroup;
  selectedFiles: FileList;
  file: any;

  constructor(private formBuilder: FormBuilder, private service: PlayerService) { }

  registerPlayer() {
    const player: Player = new Player(
      this.playerForm.get('name').value,
      this.playerForm.get('universityId').value,
      0
    );

    this.service.registerPlayer(player, this.file).then(x => console.log(x));
  }

  loginPlayer() {
    const user: User = new User(
      this.playerForm.get('name').value,
      this.playerForm.get('password').value,
    );
    this.service.loginPlayer(user).then(x => console.log(x));
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0];
  }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      name: '',
      universityId: '',
      password: '',
    });
  }

  showPassword() {
    this.typePassword = !this.typePassword;
  }

  typeSign() {
    this.signup = !this.signup;
  }

  loginClick() {
    this.login();
  }

  modalClose() {
    this.hideModal();
  }
}
