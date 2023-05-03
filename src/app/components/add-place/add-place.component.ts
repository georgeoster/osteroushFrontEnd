import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { notify } from 'src/app/utils/notifyUtils';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {

  imagePreviews: string[] = [];
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

  constructor(private placesService:PlacesService, private router: Router, private snackBar:MatSnackBar){
    this.placesService.placeAdded.subscribe(added => {
      if(added) {
        notify(this.snackBar, 'Successfully added '+this.name, 'successSnackBar');
        this.router.navigate(['viewPlaces']);
      }
    });
  }

  name:string='';
  date = new Date('');
  comments:string='';
  imagesToUpload:File[]=[];

  imageUploadHandler(e:any) {
    console.log(e);
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

  saveButtonHandler() {
    const placeToUpload = new FormData();
    placeToUpload.append('name', this.name);
    placeToUpload.append('month', this.month.toString());
    placeToUpload.append('year', this.year.toString());
    placeToUpload.append('comments', this.comments);
    this.imagesToUpload.forEach((image, i) => {
      placeToUpload.append('image'+i, image);
    });
    this.placesService.addPlace(placeToUpload);
  }

}
