import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  showMenu:boolean = false;
  menuItems:Array<{icon:string, label:string, handler: any}> = [];

  constructor(private menuService:MenuService, private router: Router){
    this.subscribeToMenuService();
    this.subscribeToSignedInService();
  }

  subscribeToMenuService(){
    this.menuService.open.subscribe((b:boolean) => {
      this.showMenu = b;
    });
  }

  homeHandler() {
    console.log('homeHandler called');
    this.router.navigate(['home']);
  }

  viewHandler() {
    console.log('viewHandler called');
  }

  addHandler() {
    console.log('addHandler called');
    this.router.navigate(['addPlace']);
  }

  signInHandler() {
    console.log('signInHandler called');
  }


  subscribeToSignedInService(){
    //TODO create signedinservice.
    this.menuItems = [
      {icon: 'home', label: 'HOME', handler: this.homeHandler.bind(this)},
      {icon: 'visibility', label: 'VIEW PLACES', handler: this.viewHandler.bind(this)},
      {icon: 'restaurant', label: 'ADD PLACE', handler: this.addHandler.bind(this)},
      {icon: 'person', label: 'SIGN IN', handler: this.signInHandler.bind(this)}
    ]
  }

}
