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
    this.http.get('https://osteroush.com/BackEnd/api/v1/places/'+year).subscribe((response) => {
      this.placesSubject.next(response);
    });
  }

  deletePlace(name:string, date:string) {
    this.http.delete('https://osteroush.com/BackEnd/api/v1/place/'+name+'/'+date).subscribe((response) => {
      console.log(response);
    });
  }
  
}
