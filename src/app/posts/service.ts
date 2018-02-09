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

  add(post: Post): Observable<Post> {
    return this.http.post<any>(this.API_PATH, post).map((resp: any) => {
      return Object.assign({}, post, resp);
    });
  }

  update(post: Post): any {
    return this.http
      .put<any>(`${this.API_PATH}/${post.id}`, post)
      .map((resp: any) => {
        return Object.assign({}, post, resp);
      });
  }

  delete(id: string): Observable<string> {
    return this.http.delete<any>(`${this.API_PATH}/${id}`).map((resp: any) => {
      return id;
    });
  }
}
