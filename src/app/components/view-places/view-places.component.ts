import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-view-places',
  templateUrl: './view-places.component.html',
  styleUrls: ['./view-places.component.css']
})
export class ViewPlacesComponent {
  places:{PlaceName:string, Comments:string, Images:[], MonthVisited:string}[] = [];
  placesServiceSubscription:Subscription = new Subscription;
  monthsEnum=[
    {label: 'Jan', value: '1'},
    {label: 'Feb', value: '2'},
    {label: 'Mar', value: '3'},
    {label: 'Apr', value: '4'},
    {label: 'May', value: '5'},
    {label: 'Jun', value: '6'},
    {label: 'Jul', value: '7'},
    {label: 'Aug', value: '8'},
    {label: 'Sep', value: '9'},
    {label: 'Oct', value: '10'},
    {label: 'Nov', value: '11'},
    {label: 'Dec', value: '12'}
  ];

  constructor(private placesService:PlacesService) {
    this.getPlaces();
  }
  ngOnDestroy() {
    this.placesServiceSubscription.unsubscribe();
  }

  getMonthFor(value:string) {
    return this.monthsEnum.find(m=>m.value===value)?.label;
  }

  sortByMonth(){
    return this.places.sort((a,b) => {
      return a.MonthVisited.localeCompare(b.MonthVisited, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }

  async getPlaces() {
    this.placesServiceSubscription = this.placesService.places.subscribe((res:{Count:number, Items: []})=>{
      if(res?.Items) {
        this.places = [];
        this.places.push(...res.Items);
        this.sortByMonth();
      }
    });
  }

}
