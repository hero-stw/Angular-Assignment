import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeLogin, TypeLoginResponse, TypeSignUp, TypeSignupResponse } from '../types/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  private serviceSubject = new Subject<string>();
  login(data: TypeLogin): Observable<TypeLoginResponse> {
    return this.http.post<TypeLoginResponse>(`${environment.login}`, data);
  }
  signup(data: TypeSignUp): Observable<any> {
    return this.http.post<TypeSignupResponse>(`${environment.signup}`, data);
  }
  logOut() {
    localStorage.removeItem('loggedInUser');
    this.serviceSubject.next('');
  }
}
