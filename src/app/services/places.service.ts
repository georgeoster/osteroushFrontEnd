import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Place } from '../types';
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
    this.http.post('http://osteroush-env.eba-puhnr5j3.us-east-2.elasticbeanstalk.com/api/v1/place', place).subscribe((response:any) => {
      if (response?.success) {
        this.yearToShowSubject.next(year);
        this.placeAddedSubject.next(true);
      }
    });
  }

  updatePlace(place:FormData) {
    this.http.patch('http://osteroush-env.eba-puhnr5j3.us-east-2.elasticbeanstalk.com/api/v1/place', place).subscribe((response) => {
      console.log(response);
    });
  }

  getPlaces(year:string) {
    this.http.get('http://osteroush-env.eba-puhnr5j3.us-east-2.elasticbeanstalk.com/api/v1/places/'+year).subscribe((response) => {
      this.placesSubject.next(response);
    });
  }

  deletePlace(name:string, date:string) {
    this.http.delete('http://osteroush-env.eba-puhnr5j3.us-east-2.elasticbeanstalk.com/api/v1/place/'+name+'/'+date).subscribe((response) => {
      console.log(response);
    });
  }
  
}
