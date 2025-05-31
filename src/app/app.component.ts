import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ViewportService } from './services/ui/viewport.service';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'osteroush';

  constructor(private viewportService: ViewportService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-XXXXXXX', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  prepareRoute(outlet: any) {
    return outlet.activatedRouteData?.['animation'];
  }
}
