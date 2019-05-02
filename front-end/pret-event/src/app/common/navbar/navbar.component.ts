import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;
  account = this.logged ? 'Sair' : 'Entrar/Cadastrar';
  navbarOpen = false;

  modalRef: BsModalRef;
  typePassword = false;
  signup = false;
  config = {
    keyboard: true,
    animated: true,
  };

  constructor(private modalService: BsModalService) {}

  ngOnInit() { }

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
    this.logged = !this.logged;
    this.account = this.logged ? 'Sair' : 'Entrar/Cadastrar';
  }
}
