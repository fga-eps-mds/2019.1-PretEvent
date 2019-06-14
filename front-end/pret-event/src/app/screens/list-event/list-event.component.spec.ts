import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventComponent } from './list-event.component';

describe('RankingComponent', () => {
  let component: ListEventComponent;
  let fixture: ComponentFixture<ListEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
