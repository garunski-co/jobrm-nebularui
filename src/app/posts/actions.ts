import { Action } from '@ngrx/store';
import { Post } from './model';

export enum PostActionTypes {
  Load = '[Post] Load',
  LoadComplete = '[Post] Load Complete',
  LoadFail = '[Post] Load Fail',
}

export class Load implements Action {
  readonly type = PostActionTypes.Load;

  constructor() {}
}

export class LoadComplete implements Action {
  readonly type = PostActionTypes.LoadComplete;

  constructor(public payload: Post[]) {}
}

export class LoadFail implements Action {
  readonly type = PostActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type PostActions = Load | LoadComplete | LoadFail;
