import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeTerrainComponent } from './demande-terrain.component';

describe('DemandeTerrainComponent', () => {
  let component: DemandeTerrainComponent;
  let fixture: ComponentFixture<DemandeTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
