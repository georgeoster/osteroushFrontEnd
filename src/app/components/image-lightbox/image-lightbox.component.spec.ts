import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLightboxComponent } from './image-lightbox.component';

describe('ImageLightboxComponent', () => {
  let component: ImageLightboxComponent;
  let fixture: ComponentFixture<ImageLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageLightboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
