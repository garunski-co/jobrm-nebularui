import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from './router.state';
import * as fromRouter from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

export interface RouterState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RouterState> = {
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<RouterState>): ActionReducer<RouterState> {
  return function(state: RouterState, action: any): RouterState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<RouterState>[] = !environment.production ? [logger, storeFreeze] : [];
