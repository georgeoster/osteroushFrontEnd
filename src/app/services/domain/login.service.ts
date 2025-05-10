import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { LoginApiService } from '../api/login-api.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn = this.loggedInSubject.asObservable();

  constructor(private loginApi: LoginApiService) {}

  login(user: string, pass: string) {
    return this.loginApi.login(user, pass).pipe(
      tap(response => {
        this.loggedInSubject.next(response.login);
      }),
      catchError(error => {
        this.loggedInSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.loggedInSubject.next(false);
  }
}
