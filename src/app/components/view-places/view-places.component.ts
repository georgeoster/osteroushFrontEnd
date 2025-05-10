import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastService } from 'src/app/services/ui/toast.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/domain/login.service';
import { PlacesService } from 'src/app/services/places.service';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';
import { Place } from '../../types';

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
  isFadingOut = false;
  toDelete:any;
  places:{PlaceName:string, Comments:string, Images:[], MonthVisited:string}[] = [];
  placesServiceSubscription:Subscription = new Subscription;
  loadingSubscription:Subscription = new Subscription;
  loggedInSubscription:Subscription = new Subscription;
  deleteSuccessfulSubscription:Subscription = new Subscription;
  viewMode: 'grid' | 'modal' = 'grid';
  selectedPlace: any = null;
  isModalClosing = false;
  isFadingInGrid = false;
  showConfirmDialog = false;


  constructor(
    private placesService:PlacesService, 
    private loginService: LoginService, 
    private toastService:ToastService, 
    private router: Router,
    private editService: EditService
  ) {
    this.loading = true;
    this.getPlaces();
    this.subscribeToLoadingService();
    this.subscribeToLoginService();
    this.subscribeToDeleteSuccessful();
  }

  subscribeToDeleteSuccessful() {
    this.deleteSuccessfulSubscription = this.placesService.deleteSuccessful.subscribe((success:any) => {
      if(success) {
        this.toastService.show(this.toDelete.PlaceName + ' has been deleted', 'success');
        this.places = this.places.filter((p:any) => p.PlaceName !== this.toDelete.PlaceName);
      } else {
        this.toastService.show('error encountered while deleting ' + this.toDelete.PlaceName , 'error');
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

  openModal(place: Place) {
    this.isFadingOut = true; // Start the fade-out animation
  
    // Wait for animation to finish (300ms matches your fadeOut animation timing)
    setTimeout(() => {
      this.selectedPlace = place;
      this.viewMode = 'modal';
      this.isFadingOut = false; // Reset it just in case
    }, 300);
  }
  
  closeModal() {
    this.isModalClosing = true; // Shrink modal
    
    setTimeout(() => {
      this.selectedPlace = null;
      this.viewMode = 'grid';
      this.isModalClosing = false;
  
      // START grid fade in
      this.isFadingInGrid = true;
  
      // END grid fade in after a moment
      setTimeout(() => {
        this.isFadingInGrid = false;
      }, 300);
    }, 300);
  }

  handleModalAnimationDone() {
    // Now safely hide the modal AFTER the shrink animation finished
    this.selectedPlace = null;
    this.viewMode = 'grid';
    this.isModalClosing = false;
  
    // Start the grid fade-in animation
    this.isFadingInGrid = true;
  
    // End grid fade-in after a moment
    setTimeout(() => {
      this.isFadingInGrid = false;
    }, 300);
  }
  
  
  sortByMonth() {
    return this.places.sort((a,b) => {
      return a.MonthVisited.localeCompare(b.MonthVisited, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }

  async deletePlace(place: Place) {
    this.toDelete = place;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    this.showConfirmDialog = false;
    this.deleting = true;

    this.selectedPlace = null;
    this.viewMode = 'grid';
  
    const placeToDelete: any = {
      PlaceName: this.toDelete.PlaceName
    };
  
    if (this.toDelete.Images?.length > 0) {
      placeToDelete.Images = JSON.stringify(this.toDelete.Images);
    }
  
    this.placesService.deletePlace(placeToDelete);
  }
  
  cancelDelete() {
    this.showConfirmDialog = false;
    this.toDelete = null;
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
