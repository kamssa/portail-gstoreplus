import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonDashboardComponent } from './mon-dashboard.component';

describe('MonDashboardComponent', () => {
  let component: MonDashboardComponent;
  let fixture: ComponentFixture<MonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
