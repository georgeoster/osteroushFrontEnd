import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { PlacesService } from 'src/app/services/places.service';
import { notify } from 'src/app/utils/notifyUtils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-view-places',
  templateUrl: './view-places.component.html',
  styleUrls: ['./view-places.component.css']
})
export class ViewPlacesComponent {
  spinnerColor:string = '#e8eaf5';
  spinnerMode:ProgressSpinnerMode = 'indeterminate';
  loading:boolean = true;
  deleting:boolean = false;
  loggedIn:boolean = false;
  toDelete:any;
  places:{PlaceName:string, Comments:string, Images:[], MonthVisited:string}[] = [];
  placesServiceSubscription:Subscription = new Subscription;
  loadingSubscription:Subscription = new Subscription;
  loggedInSubscription:Subscription = new Subscription;
  deleteSuccessfulSubscription:Subscription = new Subscription;
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

  constructor(
    private placesService:PlacesService, 
    private loginService: LoginService, 
    private toastService:ToastService, 
    private dialog: MatDialog, 
    private router: Router,
    private editService: EditService) {
    this.loading = true;
    this.getPlaces();
    this.subscribeToLoadingService();
    this.subscribeToLoginService();
    this.subscribeToDeleteSuccessful();
  }

  subscribeToDeleteSuccessful() {
    this.deleteSuccessfulSubscription = this.placesService.deleteSuccessful.subscribe((success:any) => {
      if(success) {
        notify(this.toastService, this.toDelete.PlaceName + ' has been deleted', 'success');
        this.places = this.places.filter((p:any) => p.PlaceName !== this.toDelete.PlaceName);
      } else {
        notify(this.toastService, 'error encountered while deleting ' + this.toDelete.PlaceName , 'error');
      }
    });
  }
  
  
  subscribeToLoadingService() {
    this.loadingSubscription = this.placesService.loading.subscribe((loading:any) => {
      this.loading = loading;
    });
  }
  
  subscribeToLoginService() {
    this.loggedInSubscription = this.loginService.loggedIn.subscribe((loggedIn:boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.placesServiceSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.loggedInSubscription.unsubscribe();
    this.deleteSuccessfulSubscription.unsubscribe();
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

  async deletePlace(place:any) {
    this.deleting = true;
    this.toDelete = place;
    const placeToDelete:any = {
      PlaceName: place.PlaceName
    }
    if(place.Images?.length > 0) {
      placeToDelete.Images = JSON.stringify(place.Images)
    }
    this.placesService.deletePlace(placeToDelete);
    this.deleting = false;
  }

  editPlace(place:any) {
    this.editService.setToEdit(place);
    this.router.navigate(['editPlace']);
  }

  async getPlaces() {
    this.placesServiceSubscription = this.placesService.places.subscribe((res:{Count:number, Items: []})=>{
      if(res?.Items) {
        this.places = [];
        this.places.push(...res.Items);
        this.sortByMonth();
        this.loading = false;
      }
    });
  }

}
