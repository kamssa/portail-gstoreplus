import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainVilleComponent } from './terrain-ville.component';

describe('TerrainVilleComponent', () => {
  let component: TerrainVilleComponent;
  let fixture: ComponentFixture<TerrainVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerrainVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
