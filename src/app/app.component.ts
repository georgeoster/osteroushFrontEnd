import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './components/toast/toast.component';

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

  prepareRoute(outlet: any) {
    return outlet.activatedRouteData?.['animation'];
  }

  constructor(private toastService: ToastService) {}

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  ngAfterViewInit() {
    this.toastService.register(this.toastComponent);
  }

}
