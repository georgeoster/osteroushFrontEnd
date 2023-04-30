import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  loginServiceSubscription:any;

  constructor(private loginService: LoginService, private router: Router, private snackBar:MatSnackBar){
    this.loginServiceSubscription = this.loginService.loggedIn.subscribe((loggedIn) => {
      this.loading = false;
      if (loggedIn) {
        notify(snackBar, 'Successfully logged in', 'successSnackBar');
        this.router.navigate(['home']);
      }
      if (!loggedIn && this.attempted) {
        this.loading = false;
        notify(snackBar, 'Username or password is incorrect', 'errorSnackBar');
      }
    });
  }

  ngOnDestroy() {
    this.loginServiceSubscription.unsubscribe();
  }

  login() {
    if (this.user?.length < 1 || this.pass?.length < 1) {
      notify(this.snackBar, 'Username and password are required', 'errorSnackBar');
      return;
    }
    this.loading = true;
    this.attempted = true;
    this.loginService.login(this.user, this.pass);
  }

}
