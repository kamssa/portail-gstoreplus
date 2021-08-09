import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTerrainSComponent } from './detail-terrain-s.component';

describe('DetailTerrainSComponent', () => {
  let component: DetailTerrainSComponent;
  let fixture: ComponentFixture<DetailTerrainSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTerrainSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTerrainSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
