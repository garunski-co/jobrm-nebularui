import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { switchMap, map, catchError } from 'rxjs/operators';
import { PostActionTypes, LoadComplete, LoadFail } from './actions';
import { Post } from './model';
import { PostsService } from './service';

@Injectable()
export class PostsEffects {
  @Effect()
  loadPosts$: Observable<Action> = this.actions$.pipe(
    ofType(PostActionTypes.Load),
    switchMap(() =>
      this.postsService
        .list()
        .pipe(map((posts: Post[]) => new LoadComplete(posts)), catchError(error => of(new LoadFail(error)))),
    ),
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
