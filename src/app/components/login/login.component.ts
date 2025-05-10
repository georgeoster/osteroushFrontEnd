import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/ui/toast.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/domain/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  pass: string = '';
  loading: boolean = false;
  obfuscatePassword: boolean = true;
  loginSubscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  login() {
    if (!this.user.trim() || !this.pass.trim()) {
      this.toastService.show('Username and password are required', 'error');
      return;
    }
  
    this.loading = true;
  
    this.loginSubscription = this.loginService.login(this.user, this.pass).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.login) {
          this.toastService.show('Successfully logged in', 'success');
          this.router.navigate(['home']);
        } else {
          this.toastService.show('Username or password is incorrect', 'error');
        }
      },
      error: (error) => {
        this.loading = false;
        const message = error?.error?.message || 'An unexpected error occurred';
        this.toastService.show(message, 'error');
      }
    });
  }
  
}
