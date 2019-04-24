import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

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
