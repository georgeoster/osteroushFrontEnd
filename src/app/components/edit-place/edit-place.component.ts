import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/ui/toast.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditService } from 'src/app/services/edit.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent {
  loading:boolean = false;

  images: string[] = [];
  imagePreviews: string[] = [];
  preExistingImages: string[] = [];
  imagesToDelete: string[] = [];
  reader:FileReader = new FileReader();
  i:number = 0;

  months=[
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
  month:string='';

  years=[
    {label: '2023', value: '2023'},
    {label: '2022', value: '2022'},
    {label: '2021', value: '2021'},
    {label: '2020', value: '2020'},
    {label: '2019', value: '2019'},
    {label: '2018', value: '2018'},
    {label: '2017', value: '2017'}
  ];
  year:string='';

  placesServiceSubscription: Subscription = new Subscription;
  editServiceSubscription:Subscription = new Subscription;
  patchServiceSubscription: Subscription = new Subscription;

  constructor(private placesService:PlacesService, private router: Router, private toastService:ToastService, private editService: EditService){
    this.subscribeToEditService();
    this.subscribeToPlacesService();
    this.subscribeToPatchService();
  }

  subscribeToPatchService() {
    this.patchServiceSubscription = this.placesService.patchSuccessful.subscribe((success:any) => {
      if(success) {
        this.toastService.show(this.name + ' has been updated', 'success');
        this.router.navigate(['viewPlaces']);
      } else {
        this.toastService.show('error encountered while updating ' + this.name , 'error');
      }
    });
  }

  subscribeToEditService() {
    this.editServiceSubscription = this.editService.toEdit.subscribe((place:any) => {
      if (place) {
        this.name = place?.PlaceName;
        this.month = place?.MonthVisited;
        this.year = place?.YearVisited;
        this.comments = place?.Comments;
      }
      if(place?.Images?.length > 0) {
        this.images = place.Images;
        this.processImages(place.Images);
      }
    });
  }

  processImages(images:[]){
    images.forEach((image) => {
      const url = 'https://osteroushimages.s3.us-east-2.amazonaws.com/'+image;
      this.preExistingImages.push(url);
    });
  }

  subscribeToPlacesService(){
    this.placesServiceSubscription = this.placesService.placeAdded.subscribe(added => {
      if(added) {
        this.toastService.show('Successfully added '+this.name, 'success');
        this.router.navigate(['viewPlaces']);
      }
    });
  }

  ngOnDestroy() {
    this.placesServiceSubscription.unsubscribe();
    this.editServiceSubscription.unsubscribe();
    this.patchServiceSubscription.unsubscribe();
  }

  name:string='';
  date = new Date('');
  comments:string='';
  imagesToUpload:File[]=[];

  imageUploadHandler(e:any) {
    this.imagesToUpload.push(...e?.target?.files);
    this.reader.onload = () => {
      if ( !this.imagePreviews.includes(this.reader.result as string) ) {
        this.imagePreviews.push((this.reader.result as string));
      }
      this.i++;
      if (this.i !== this.imagesToUpload.length) {
        this.readIn();
      }
    }
    this.i = 0;
    this.readIn();
  }

  readIn(){
    this.reader.readAsDataURL(this.imagesToUpload[this.i]);
  }

  removeImage(i:number){
    this.imagesToUpload.splice(i,1);
    this.imagePreviews.splice(i,1);
  }

  removePreExistingImage(i:number){
    const completeUrl = this.preExistingImages[i];
    const lastSlashIndex = completeUrl.lastIndexOf('/');
    const toDelete = completeUrl.slice(lastSlashIndex + 1, completeUrl.length);
    this.imagesToDelete.push(toDelete);
    this.preExistingImages.splice(i,1);
  }

  saveButtonHandler() {
    this.loading = true;
    const placeToUpload = new FormData();
    placeToUpload.append('name', this.name);
    placeToUpload.append('month', this.month.toString());
    placeToUpload.append('year', this.year.toString());
    placeToUpload.append('comments', this.comments);
    placeToUpload.append('imagesToDelete', JSON.stringify(this.imagesToDelete));
    placeToUpload.append('images', JSON.stringify(this.images));

    this.imagesToUpload.forEach((image, i) => {
      placeToUpload.append('image'+i, image);
    });
    this.placesService.updatePlace(placeToUpload);
  }
}
