import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource = new BehaviorSubject({ type: '', msg: '', timeout: 0 });
  currentAlert = this.alertSource.asObservable();

  constructor() { }

  addAlert(alert: Alert) {
    this.alertSource.next(alert);
  }
}
