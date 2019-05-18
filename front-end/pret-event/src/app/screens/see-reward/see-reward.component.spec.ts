import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRewardComponent } from './see-reward.component';

describe('SeeRewardComponent', () => {
  let component: SeeRewardComponent;
  let fixture: ComponentFixture<SeeRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
