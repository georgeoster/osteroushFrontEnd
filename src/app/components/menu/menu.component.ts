import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  showMenu:boolean = false;
  menuItems:Array<{icon:string, label:string, handler: any}> = [];

  constructor(private menuService:MenuService, private loginService:LoginService, private router: Router){
    this.subscribeToMenuService();
    this.subscribeToLogInService();
  }

  subscribeToMenuService(){
    this.menuService.open.subscribe((b:boolean) => {
      this.showMenu = b;
    });
  }

  closeMenu(){
    this.menuService.closeMenu();
  }

  homeHandler() {
    this.router.navigate(['home']);
    this.closeMenu();
  }

  viewHandler() {
    this.router.navigate(['viewPlaces']);
    this.closeMenu();
  }

  addHandler() {
    this.router.navigate(['addPlace']);
    this.closeMenu();
  }

  signInHandler() {
    this.router.navigate(['login']);
    this.closeMenu();
  }

  signOutHandler() {
    this.loginService.logout();
    this.router.navigate(['home']);
    this.closeMenu();
  }


  subscribeToLogInService(){
    this.loginService.loggedIn.subscribe((loggedIn:boolean) => {
      this.menuItems = [
        {icon: 'home', label: 'Home', handler: this.homeHandler.bind(this)},
        {icon: 'visibility', label: 'View Places', handler: this.viewHandler.bind(this)}
      ]
      if (loggedIn) {
        this.menuItems.push({icon: 'restaurant', label: 'Add Place', handler: this.addHandler.bind(this)});
        this.menuItems.push({icon: 'person', label: 'Sign Out', handler: this.signOutHandler.bind(this)});
      } else {
        this.menuItems.push({icon: 'person', label: 'Sign In', handler: this.signInHandler.bind(this)});
      }
    });
  }

}
