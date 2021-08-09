import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllImmobilierComponent } from './all-immobilier.component';

describe('AllImmobilierComponent', () => {
  let component: AllImmobilierComponent;
  let fixture: ComponentFixture<AllImmobilierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllImmobilierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
