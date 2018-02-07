import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './model';

@Injectable()
export class PostsService {
  constructor(public http: HttpClient) {}
  private API_PATH = `https://my-json-server.typicode.com/typicode/demo/posts`;

  list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_PATH}`);
  }

  add(post) {
    return this.http.post(this.API_PATH, post);
  }
}
