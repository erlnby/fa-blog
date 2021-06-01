import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {tap} from 'rxjs/operators';

const HOST = 'http://localhost:8080';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject(JSON.parse(localStorage.getItem(USER_KEY)));

  constructor(private http: HttpClient) {
    this.user.subscribe(user => {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    });
  }

  public join(login: string, password: string, email: string): Observable<User> {
    return this.http.post<User>(`${HOST}/join`, {
      login,
      password,
      email
    }).pipe(
      tap(user => this.user.next(user)),
    );
  }

  public login(login: string, password: string): Observable<User> {
    return this.http.post<User>(`${HOST}/login`, {
      login,
      password
    }).pipe(
      tap(user => this.user.next(user)),
    );
  }

  public logout(): void {
    this.user.next(null);
  }

  public getUser(): User {
    return this.user.value;
  }

  public get authenticated(): boolean {
    return !!this.user.value;
  }

  public user$(): Observable<User> {
    return this.user.asObservable();
  }
}
