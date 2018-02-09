import { Action } from '@ngrx/store';
import { Post } from './model';

export enum PostActionTypes {
  Load = '[Post] Load',
  LoadCompleted = '[Post] Load Completed',
  LoadFailed = '[Post] Load Failed',
  Add = '[Post] Add',
  AddCompleted = '[Post] Add Completed',
  AddFailed = '[Post] Add Failed',
  Edit = '[Post] Edit',
  EditCompleted = '[Post] Edit Completed',
  EditFailed = '[Post] Edit Failed',
  Delete = '[Post] Delete',
  DeleteCompleted = '[Post] Delete Completed',
  DeleteFailed = '[Post] Delete Failed',
}

export class Load implements Action {
  readonly type = PostActionTypes.Load;

  constructor() {}
}

export class LoadCompleted implements Action {
  readonly type = PostActionTypes.LoadCompleted;

  constructor(public payload: Post[]) {}
}

export class LoadFailed implements Action {
  readonly type = PostActionTypes.LoadFailed;

  constructor(public payload: any) {}
}

export class Add implements Action {
  readonly type = PostActionTypes.Add;

  constructor(public payload: Post) {}
}

export class AddCompleted implements Action {
  readonly type = PostActionTypes.AddCompleted;

  constructor(public payload: Post) {}
}

export class AddFailed implements Action {
  readonly type = PostActionTypes.AddFailed;

  constructor(public payload: any) {}
}

export class Edit implements Action {
  readonly type = PostActionTypes.Edit;

  constructor(public payload: Post) {}
}

export class EditCompleted implements Action {
  readonly type = PostActionTypes.EditCompleted;

  constructor(public payload: Post) {}
}

export class EditFailed implements Action {
  readonly type = PostActionTypes.EditFailed;

  constructor(public payload: any) {}
}

export class Delete implements Action {
  readonly type = PostActionTypes.Delete;

  constructor(public payload: string) {}
}

export class DeleteCompleted implements Action {
  readonly type = PostActionTypes.DeleteCompleted;

  constructor(public payload: string) {}
}

export class DeleteFailed implements Action {
  readonly type = PostActionTypes.DeleteFailed;

  constructor(public payload: any) {}
}

export type PostActions =
  | Load
  | LoadCompleted
  | LoadFailed
  | Add
  | AddCompleted
  | AddFailed
  | Edit
  | EditCompleted
  | EditFailed
  | Delete
  | DeleteCompleted
  | DeleteFailed;
