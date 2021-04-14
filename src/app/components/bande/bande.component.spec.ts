import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeComponent } from './bande.component';

describe('BandeComponent', () => {
  let component: BandeComponent;
  let fixture: ComponentFixture<BandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
