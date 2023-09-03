import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private toEditSubject = new BehaviorSubject({});
  toEdit = this.toEditSubject.asObservable();

  constructor() { }

  setToEdit(place:FormData) {
    this.toEditSubject.next(place);
  }
}
