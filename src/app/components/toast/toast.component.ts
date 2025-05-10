
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/ui/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' = 'success';
  visible: boolean = false;
  toastSubscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.toasts$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }
}
