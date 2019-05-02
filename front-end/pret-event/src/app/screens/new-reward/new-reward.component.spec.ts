import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRewardComponent } from './new-reward.component';

describe('NewRewardComponent', () => {
  let component: NewRewardComponent;
  let fixture: ComponentFixture<NewRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
