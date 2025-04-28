import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-place-carousel',
  templateUrl: './place-carousel.component.html',
  animations: [
    trigger('slideAnimation', [
      state('left', style({ transform: 'translateX(0%)' })),
      state('right', style({ transform: 'translateX(0%)' })),
      state('leftAlt', style({ transform: 'translateX(0%)' })),
      state('rightAlt', style({ transform: 'translateX(0%)' })),
    
      transition('* => left', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out')
      ]),
      transition('* => right', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out')
      ]),
      transition('* => leftAlt', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out')
      ]),
      transition('* => rightAlt', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out')
      ]),
    ]),
    
  ],
})
export class PlaceCarouselComponent {
  @Input() images: string[] = [];
  @Output() imageClicked = new EventEmitter<string>();

  currentImageIndex = 1;
  animationDirection: 'left' | 'right' | 'leftAlt' | 'rightAlt' = 'left';
  animationKey = 0; // Counter to force change

  getImageUrl(index: number): string {
    return `https://osteroushimages.s3.us-east-2.amazonaws.com/${this.images[index]}`;
  }

  nextImage() {
    this.animationDirection = this.animationDirection === 'left' ? 'leftAlt' : 'left';
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
  
  prevImage() {
    this.animationDirection = this.animationDirection === 'right' ? 'rightAlt' : 'right';
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
 
  onImageClick() {
    const imageUrl = this.getImageUrl(this.currentImageIndex);
    this.imageClicked.emit(imageUrl);
  }
}
