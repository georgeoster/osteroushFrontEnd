import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})

export class ImageViewerComponent {
  @Input() preview: String = '';
  @Input() i:number = 0;
  @Output("removeImage") removeImage: EventEmitter<any> = new EventEmitter();
}
