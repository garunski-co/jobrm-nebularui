import { Post } from './model';
import { PostActions, PostActionTypes } from './actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// tslint:disable:no-empty-interface
export interface PostsState extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id,
  sortComparer: false,
});

export const initialState: PostsState = adapter.getInitialState({});

export function reducers(state = initialState, action: PostActions): PostsState {
  switch (action.type) {
    case PostActionTypes.LoadComplete: {
      return { ...adapter.addMany(action.payload, state) };
    }

    default: {
      return state;
    }
  }
}

export const getPosts = (state: PostsState) => state.entities;

export const getPostsState = createFeatureSelector<PostsState>('posts');

export const { selectAll: getAll } = adapter.getSelectors(getPostsState);
