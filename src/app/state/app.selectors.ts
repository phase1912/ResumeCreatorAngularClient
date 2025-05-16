import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectUserInformation = createSelector(
  selectAppState,
  (appState: AppState) => appState?.generalInformation
);
