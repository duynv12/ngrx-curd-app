import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URL}/users`);
  }

  add(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/users/`, user);
  }

  update(user: User) {
    return this.http.patch(`${this.API_URL}/users/${user.id}`, user);
  }

  delete(user: User): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/${user.id}`);
  }
}
