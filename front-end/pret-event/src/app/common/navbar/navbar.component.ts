import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { AlertService } from '../../services/alert.service';
import { getToken, removeToken } from '../../helpers/token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = getToken() !== null;
  account =  this.logged ? 'Sair' : 'Entrar/Cadastrar';
  navbarOpen = false;

  modalRef: BsModalRef;
  typePassword = false;
  signup = false;
  config = {
    keyboard: true,
    animated: true,
  };
  alerts: any[] = [];

  constructor(private modalService: BsModalService, private data: AlertService) {}

  ngOnInit() {
    this.data.currentAlert.subscribe(alert => this.alerts.push(alert));
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
