import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { notify } from 'src/app/utils/notifyUtils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:string='';
  pass:string='';
  loading:boolean=false;
  attempted:boolean=false;
  obfuscatePassword:boolean=true;
  loginServiceSubscription: Subscription = new Subscription;

  constructor(private loginService: LoginService, private router: Router, private toastService:ToastService){
    this.subscribeToLoginService();
  }

  subscribeToLoginService(){
    this.loginServiceSubscription = this.loginService.loggedIn.subscribe((loggedIn) => {
      this.loading = false;
      if (loggedIn) {
        notify(this.toastService, 'Successfully logged in', 'success');
        this.router.navigate(['home']);
      }
      if (!loggedIn && this.attempted) {
        this.loading = false;
        notify(this.toastService, 'Username or password is incorrect', 'error');
      }
    });
  }

  ngOnDestroy() {
    this.loginServiceSubscription.unsubscribe();
  }

  login() {
    if (this.user?.length < 1 || this.pass?.length < 1) {
      notify(this.toastService, 'Username and password are required', 'error');
      return;
    }
    this.loading = true;
    this.attempted = true;
    this.loginService.login(this.user, this.pass);
  }

}
