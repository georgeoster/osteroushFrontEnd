
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginApiService {
  constructor(private http: HttpClient) {}

  login(user: string, pass: string): Observable<{ login: boolean }> {
    return this.http.get<{ login: boolean }>(`https://osteroush.com/BackEnd/api/v1/login/${user}/${pass}`);
  }
}
