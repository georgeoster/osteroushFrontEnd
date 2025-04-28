import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MONTHS } from '../../utils/constants';
import { Place } from '../../types';
import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.css']
})
export class PlaceModalComponent {
  @Input() loggedIn: boolean = false;
  @Input() place!: Place;
  @Output() closeModal = new EventEmitter<void>();
  @Output() animationDone = new EventEmitter<void>();
  @Output() editPlace = new EventEmitter<Place>();
  @Output() deletePlace = new EventEmitter<Place>();
  
  isClosing = false;
  
  constructor(private lightboxService: LightboxService) {}

  get isOpen() {
    return !!this.place && !this.isClosing;
  }

  expandImage(url: string) {
    this.lightboxService.open(url);
  }

  close() {
    this.isClosing = true;
    setTimeout(() => {
      this.animationDone.emit();
      this.isClosing = false;
    }, 300);
  }

  getMonthFor(value: string) {
    return MONTHS.find((m) => m.value === value)?.label;
  }

  getCardPreview(place: Place): string {
    if (place.Images && place.Images.length > 0) {
      return `https://osteroushimages.s3.us-east-2.amazonaws.com/${place.Images[0]}`;
    }
    return '../../assets/placePlaceHolder.jpg';
  }

  getFormattedComments(): string {
    return this.place.Comments.replace(/\n/g, '<br>');
  }

  edit() {
    this.editPlace.emit(this.place);
  }

  delete() {
    this.deletePlace.emit(this.place);
  }
}
