import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placeAddedSubject = new Subject();
  placeAdded = this.placeAddedSubject.asObservable();

  private yearToShowSubject = new Subject();
  yearToShow = this.yearToShowSubject.asObservable();

  private placesSubject = new BehaviorSubject(<any>[]);
  places = this.placesSubject.asObservable();

  private loadingSubject = new Subject();
  loading = this.loadingSubject.asObservable();

  private deleteSuccessfulSubject = new Subject();
  deleteSuccessful = this.deleteSuccessfulSubject.asObservable();

  constructor(private http:HttpClient) { }

  addPlace(place:FormData) {
    const year = place.get('year');
    this.http.post('https://osteroush.com/BackEnd/api/v1/place', place).subscribe((response:any) => {
      if (response?.success) {
        this.yearToShowSubject.next(year);
        this.placeAddedSubject.next(true);
      }
    });
  }

  updatePlace(place:FormData) {
    this.http.patch('https://osteroush.com/BackEnd/api/v1/place', place).subscribe((response) => {
      console.log(response);
    });
  }

  getPlaces(year:string) {
    this.loadingSubject.next(true);
    this.http.get('https://osteroush.com/BackEnd/api/v1/places/'+year).subscribe((response) => {
      this.placesSubject.next(response);
    });
  }

  deletePlace(place:FormData) {
    this.http.request('delete', 'http://localhost:3000/BackEnd/api/v1/place/', { body: place }).subscribe((response:any) => {
      if (response?.success) {
        this.deleteSuccessfulSubject.next(true);
      } else {
        this.deleteSuccessfulSubject.next(false);
      }
    });
  }
  
}
