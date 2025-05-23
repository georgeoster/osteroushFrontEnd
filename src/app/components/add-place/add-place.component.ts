// import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/ui/toast.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlacesService } from 'src/app/services/places.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('monthSelect') monthSelect!: ElementRef;
  @ViewChild('yearSelect') yearSelect!: ElementRef;

  loading:boolean = false;

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
    {label: '2026', value: '2026'},
    {label: '2025', value: '2025'},
    {label: '2024', value: '2024'},
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

  constructor(private placesService:PlacesService, private router: Router, private toastService: ToastService){
    this.subscribeToPlacesService();
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

  saveButtonHandler() {
    if (!this.name.trim()) {
      this.toastService.show('Please enter a Name.', 'error');
      this.nameInput.nativeElement.focus();
      this.triggerWiggle(this.nameInput);
      return;
    }
    
    if (!this.month) {
      this.toastService.show('Please select a Month.', 'error');
      this.monthSelect.nativeElement.focus();
      this.triggerWiggle(this.monthSelect);
      return;
    }
    
    if (!this.year) {
      this.toastService.show('Please select a Year.', 'error');
      this.yearSelect.nativeElement.focus();
      this.triggerWiggle(this.yearSelect);
      return;
    }
  
    this.loading = true;
    const placeToUpload = new FormData();
    placeToUpload.append('name', this.name);
    placeToUpload.append('month', this.month.toString());
    placeToUpload.append('year', this.year.toString());
    placeToUpload.append('comments', this.comments);
    this.imagesToUpload.forEach((image, i) => {
      placeToUpload.append('image' + i, image);
    });
    placeToUpload.append('lastImageIndex', this.imagesToUpload.length.toString());
    this.placesService.addPlace(placeToUpload);
  }

  triggerWiggle(element: ElementRef) {
    const el = element.nativeElement;
    el.classList.remove('wiggle'); // Reset if already animating
    void el.offsetWidth; // Force reflow 
    el.classList.add('wiggle');
  }
  
}
