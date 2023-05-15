import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSubject = new BehaviorSubject(false);
  loggedIn = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(user:string, pass:string) {
    this.http.get('https://osteroush.com/BackEnd/api/v1/login/'+user+'/'+pass).subscribe((response:any) => {
      this.loggedInSubject.next(response.login);
    });
  }

  logout(){
    this.loggedInSubject.next(false);
  }
}
