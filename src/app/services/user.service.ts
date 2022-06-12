import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(environment.users);
  }

  getUser(id: string) : Observable<User> {
    return this.http.get<User>(environment.users + '/' + id);
  }

  deleteUser(id: string) : Observable<User> {
    return this.http.delete<User>(environment.users + '/' + id);
  }

  addUser(user: User) : Observable<User> {
    return this.http.post<User>(environment.users, user);
  }

  updateUser(id: string, user: User) : Observable<User> {
    return this.http.put<User>(environment.users + '/' + id, user);
  }

}
