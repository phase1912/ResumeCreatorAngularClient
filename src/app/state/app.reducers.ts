import { AppState } from './app.state';
import { createReducer, on } from '@ngrx/store';
import { CreateCVPortalActions } from './app.actions';

export const initialState: AppState = new AppState();

export const appStateReducer = createReducer(
  initialState,
  on(CreateCVPortalActions.languageChanged, (state, { language }) => ({ ...state, language: language })),
);
