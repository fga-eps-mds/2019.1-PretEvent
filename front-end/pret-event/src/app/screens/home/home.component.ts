import { Component, OnInit } from '@angular/core';
import dateFormatter from 'src/helpers/dateFormatter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events = [
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://statig2.akamaized.net/bancodeimagens/4w/o1/sg/4wo1sguffkqo91zgajlc3o19w.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
  ];

  mainEvents = [
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://s3-sa-east-1.amazonaws.com/bilheteriadigital/banners/29fa4145bcd8ecd70083f8d417a2177c74fa04f8.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://s3-sa-east-1.amazonaws.com/bilheteriadigital/banners/950a2ac875b055815631d7c0cbc44811d07206f2.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
    {
      title: 'Djorkaeff',
      date: '2019-04-18',
      url_image: 'https://s3-sa-east-1.amazonaws.com/bilheteriadigital/banners/aca8df289f53ac00547dbd8eb8689955773bbd4e.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a pulvinar quam.',
    },
  ];

  rows = this.events.slice(0, (this.events.length / 4) + 1).map((_d, i) => i);
  columns = Array(0, 1, 2, 3);

  constructor() { }

  ngOnInit() {
    this.events = this.events.map(event => ({ ...event, formated: dateFormatter(event.date)}));
  }
}
