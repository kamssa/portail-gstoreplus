import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevidComponent } from './demande-devid.component';

describe('DemandeDevidComponent', () => {
  let component: DemandeDevidComponent;
  let fixture: ComponentFixture<DemandeDevidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeDevidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeDevidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
