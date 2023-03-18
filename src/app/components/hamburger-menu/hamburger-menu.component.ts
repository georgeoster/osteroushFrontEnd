import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent {
  menuOpen:boolean = false;
  brand:string = 'OSTEROUSH';

  constructor(private menuService:MenuService) {
    this.subscribeToMenuService();
  }

  subscribeToMenuService() {
    this.menuService.open.subscribe((b:boolean) => {
      this.menuOpen = b;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuService.setMenuState(this.menuOpen);
  }
}
