import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  showMenu:boolean = false;

  constructor(private menuService:MenuService){
    this.menuService.open.subscribe((b:boolean) => {
      this.showMenu = b;
    });
  }

}
