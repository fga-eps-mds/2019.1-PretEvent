import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from '../../models/player';
import { User } from '../../models/user';
import { PlayerService } from '../../services/player.service';
import { AlertService } from '../../services/alert.service';

import { setToken } from '../../helpers/token';
import { Alert } from 'src/app/models/alert';
import { setId } from 'src/app/helpers/id';

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
  clicked = false;

  constructor(private formBuilder: FormBuilder, private service: PlayerService, private data: AlertService) { }

  registerPlayer() {
    this.clicked = true;
    const player: Player = new Player(
      this.playerForm.get('name').value,
      this.playerForm.get('universityId').value,
      0,
      this.playerForm.get('password').value,
    );
    this.service.registerPlayer(player, this.file)
      .then(x => {
        console.log(x);
        this.data.addAlert(new Alert('success', 'Registro realizado!', 3000));
        this.hideModal();
        this.clicked = false;
      })
      .catch(x => {
        console.log(x);
        this.clicked = false;
      });
  }

  loginPlayer() {
    this.clicked = true;
    const user: User = new User(
      this.playerForm.get('name').value,
      this.playerForm.get('password').value,
    );
    this.service.loginPlayer(user)
      .then((user: { token: string, user: { pk: number } }) => {
        setToken(user.token);
        setId(user.user.pk);
        this.data.addAlert(new Alert('success', 'Login realizado!', 3000));
        this.hideModal();
        this.clicked = false;
        this.login();
      })
      .catch((x: { error: {} }) => {
        console.log(x);
        this.clicked = false;
      });
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

  modalClose() {
    this.hideModal();
  }
}