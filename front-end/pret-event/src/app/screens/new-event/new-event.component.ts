import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  typePassword = false;
  signup = false;
  eventForm: FormGroup;
  selectedFiles: FileList;
  file: any;
  valid = true;

  constructor(private formBuilder: FormBuilder, private service: EventService) { }

  registerEvent() {
    const event: Event = new Event(
      this.eventForm.get('name').value,
      this.eventForm.get('date').value,
      0,
      this.eventForm.get('description').value,
    );
    this.service.registerEvent(event, this.file).then(x => console.log(x));
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0];
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: '',
      description: '',
      date: '',
    });
  }

}