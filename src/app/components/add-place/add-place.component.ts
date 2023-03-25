import { Component } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {

  placeToDisplay:any;
  message:String = '';
  imagePreviews: string[] = [];
  reader:FileReader = new FileReader();
  i:number = 0;

  constructor(private placesService:PlacesService){
    placesService.placeToDisplay.subscribe((res)=>{
      console.log('OBSERVABLE FIRES WITH:');
      console.log(res);
      this.placeToDisplay = res;
      this.message = res.message;
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
    placeToUpload.append('date', this.date.toString());
    placeToUpload.append('comments', this.comments);
    this.imagesToUpload.forEach((image, i) => {
      placeToUpload.append('image'+i, image);
    });
    this.logIt(placeToUpload);
    this.placesService.addPlace(placeToUpload);
  }

  updateButtonHandler() {
    const placeToUpdate = new FormData();
    placeToUpdate.append('name', this.name);
    placeToUpdate.append('date', this.date.toString());
    placeToUpdate.append('comments', this.comments);
    placeToUpdate.append('imagesToDelete', this.comments);
    
    //TODO, append imagesToDelete 
    //TODO, append new images
    this.placesService.updatePlace(placeToUpdate);
  }

  deleteButtonHandler() {
    this.placesService.deletePlace(this.name, this.date.toString());
  }

  logIt(placeToUpload:FormData) {
    console.log(placeToUpload.getAll('name'));
    console.log(placeToUpload.getAll('date'));
    console.log(placeToUpload.getAll('comments'));
    this.imagesToUpload.forEach((image, i) => {
      console.log(placeToUpload.getAll('image'+i));
    });
  }
}
