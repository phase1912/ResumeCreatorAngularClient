import { ActionReducer, MetaReducer } from '@ngrx/store';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const nextState = reducer(state, action);

    if (nextState && nextState.createCvState && Object.keys(nextState.createCvState).length > 0) {
      localStorage.setItem('create-cv-storage', JSON.stringify(nextState));
    }

    return reducer(state, action);
  };
}



export const metaReducers: MetaReducer<any>[] = [debug];
