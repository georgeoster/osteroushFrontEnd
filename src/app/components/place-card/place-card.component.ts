import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MONTHS } from '../../utils/constants';
import { Place } from '../../types';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
})
export class PlaceCardComponent {
  @Input() place!: Place;
  @Output() clicked = new EventEmitter<void>();

  getCardPreview(place: Place): string {
    if (place?.Images && place.Images.length > 0) {
      return `https://osteroushimages.s3.us-east-2.amazonaws.com/${place.Images[0]}`;
    }
    return '../../assets/placePlaceHolder.jpg'; // Fallback if no images
  }

  getMonthFor(value: string) {
    return MONTHS.find((m) => m.value === value)?.label;
  }

  cardClicked() {
    this.clicked.emit();
  }
}
