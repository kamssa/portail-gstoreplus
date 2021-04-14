import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllterrainComponent } from './allterrain.component';

describe('AllterrainComponent', () => {
  let component: AllterrainComponent;
  let fixture: ComponentFixture<AllterrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllterrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllterrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
