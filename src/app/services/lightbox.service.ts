import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private imageUrlSubject = new BehaviorSubject<string | null>(null);
  imageUrl$ = this.imageUrlSubject.asObservable();

  open(url: string) {
    this.imageUrlSubject.next(url);
  }

  close() {
    this.imageUrlSubject.next(null);
  }
}
