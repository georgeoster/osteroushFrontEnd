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
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

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
    ImageLightboxComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LucideAngularModule.pick({ House, Eye, Utensils, User, X, Check, ChevronRight, ChevronLeft })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
