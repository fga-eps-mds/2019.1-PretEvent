import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { AlertService } from '../../services/alert.service';
import { getToken, removeToken } from '../../helpers/token';
import { removeId, getId } from 'src/app/helpers/id';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar ',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  
  
})
export class NavbarComponent implements OnInit {

  logged = getToken() !== null;
  navbarOpen = false;

  modalRef: BsModalRef;
  typePassword = false;
  signup = false;
  config = {
    keyboard: true,
    animated: true,
  };
  alerts: any[] = [];
  player: Player;
  name: string;
  currentId = +getId();
  account =  this.logged ? 'Sair' : 'Entrar/Cadastrar';
  router: Router;


  constructor(private modalService: BsModalService, private data: AlertService, private playerservice: PlayerService) {}

  ngOnInit() {
    this.data.currentAlert.subscribe(alert => this.alerts.push(alert));
    this.playerservice.getPlayerid(this.currentId)
    .then((player: Player) => {
      this.player = player;
      this.name = this.player.username;
    })
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  hideModal = () => {
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  login = () => {
    let msg = '';
    if (this.logged) {
      removeToken();
      removeId();
      this.account = 'Entrar/Cadastrar';
      msg = 'Logout realizado!';
    }
    if (!this.logged) {
      this.account = 'Sair';
      msg = 'Login realizado!';
    }
    this.logged = !this.logged;
    return false;
  }
}
