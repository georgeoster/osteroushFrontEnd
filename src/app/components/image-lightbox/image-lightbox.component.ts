import { Component } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
})
export class ImageLightboxComponent {
  imageUrl: string | null = null;

  constructor(private lightboxService: LightboxService) {
    this.lightboxService.imageUrl$.subscribe((url) => {
      this.imageUrl = url;
    });
  }

  close() {
    this.lightboxService.close();
  }
}
