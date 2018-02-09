import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import {
  PostActionTypes,
  LoadCompleted,
  LoadFailed,
  Add,
  AddCompleted,
  AddFailed,
  Edit,
  EditCompleted,
  EditFailed,
  DeleteCompleted,
  DeleteFailed,
  Delete,
} from './actions';
import { Post } from './model';
import { PostsService } from './service';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffects {
  @Effect()
  loadPosts$: Observable<Action> = this.actions$.pipe(
    ofType(PostActionTypes.Load),
    switchMap(() =>
      this.postsService
        .list()
        .pipe(
          map((posts: Post[]) => new LoadCompleted(posts)),
          catchError(error => of(new LoadFailed(error))),
        ),
    ),
  );

  @Effect()
  addPost$: Observable<Action> = this.actions$.pipe(
    ofType(PostActionTypes.Add),
    switchMap((a: Add) => {
      return this.postsService
        .add(a.payload)
        .pipe(
          map((post: Post) => new AddCompleted(post)),
          catchError(error => of(new AddFailed(error))),
        );
    }),
  );

  @Effect()
  editPost$: Observable<Action> = this.actions$.pipe(
    ofType(PostActionTypes.Edit),
    switchMap((a: Edit) => {
      return this.postsService
        .update(a.payload)
        .pipe(
          map((post: Post) => new EditCompleted(post)),
          catchError(error => of(new EditFailed(error))),
        );
    }),
  );

  @Effect()
  deletePost$: Observable<Action> = this.actions$.pipe(
    ofType(PostActionTypes.Delete),
    switchMap((a: Delete) => {
      return this.postsService
        .delete(a.payload)
        .pipe(
          map((id: string) => new DeleteCompleted(id)),
          catchError(error => of(new DeleteFailed(error))),
        );
    }),
  );

  @Effect({ dispatch: false })
  redirectToList$: Observable<Action> = this.actions$.pipe(
    ofType(PostActionTypes.AddCompleted, PostActionTypes.EditCompleted),
    tap(() => this.router.navigate(['/pages/posts'])),
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router,
  ) {}
}
