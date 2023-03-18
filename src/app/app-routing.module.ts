import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlaceComponent } from './components/add-place/add-place.component';

const routes: Routes = [
  { path: 'addPlace', component: AddPlaceComponent },
  { path: '**', redirectTo: 'addPlace', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
