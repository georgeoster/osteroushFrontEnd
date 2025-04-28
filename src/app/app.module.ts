import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { HeaderComponent } from './components/header/header.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeComponent } from './components/home/home.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ViewPlacesComponent } from './components/view-places/view-places.component';
import { LoginComponent } from './components/login/login.component';
import { EditPlaceComponent } from './components/edit-place/edit-place.component';
import { ToastComponent } from './components/toast/toast.component';
import { PlaceModalComponent } from './components/place-modal/place-modal.component';
import { PlaceCardComponent } from './components/place-card/place-card.component';
import { PlaceCarouselComponent } from './components/place-carousel/place-carousel.component';
import { ImageLightboxComponent } from './components/image-lightbox/image-lightbox.component';

import { LucideAngularModule, House, Eye, Utensils, User, X, Check, ChevronRight, ChevronLeft } from 'lucide-angular';


@NgModule({
  declarations: [
    AppComponent,
    AddPlaceComponent,
    HeaderComponent,
    HamburgerMenuComponent,
    MenuComponent,
    HomeComponent,
    ImageViewerComponent,
    ViewPlacesComponent,
    LoginComponent,
    EditPlaceComponent,
    ToastComponent,
    PlaceModalComponent,
    PlaceCardComponent,
    PlaceCarouselComponent,
    ImageLightboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    LucideAngularModule.pick({ House, Eye, Utensils, User, X, Check, ChevronRight, ChevronLeft })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
