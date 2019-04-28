import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRegistrationComponent } from './player-registration.component';

describe('PlayerRegistrationComponent', () => {
  let component: PlayerRegistrationComponent;
  let fixture: ComponentFixture<PlayerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
