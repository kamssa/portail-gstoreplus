import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTerraintComponent } from './detail-terraint.component';

describe('DetailTerraintComponent', () => {
  let component: DetailTerraintComponent;
  let fixture: ComponentFixture<DetailTerraintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTerraintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTerraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
