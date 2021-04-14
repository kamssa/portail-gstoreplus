import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTerrainComponent } from './liste-terrain.component';

describe('ListeTerrainComponent', () => {
  let component: ListeTerrainComponent;
  let fixture: ComponentFixture<ListeTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
