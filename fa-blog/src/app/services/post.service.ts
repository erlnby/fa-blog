import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {map} from 'rxjs/operators';

const HOST = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }

  public getPosts(): void {
    this.http
      .get<Post[]>(`${HOST}/posts`)
      .subscribe(posts => this.posts.next(posts));
  }

  public posts$(): Observable<Post[]> {
    return this.posts.asObservable();
  }
}
