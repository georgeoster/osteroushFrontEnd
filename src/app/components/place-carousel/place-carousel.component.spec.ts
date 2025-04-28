import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCarouselComponent } from './place-carousel.component';

describe('PlaceCarouselComponent', () => {
  let component: PlaceCarouselComponent;
  let fixture: ComponentFixture<PlaceCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
