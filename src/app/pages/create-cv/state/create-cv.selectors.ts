import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateCvState } from './create-cv.state';

export const selectCreateCvState = createFeatureSelector<CreateCvState>('createCvState');

export const selectUserInformation = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.userInformation
);

export const selectTemplateName = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.templateName
);

export const selectTitle = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.title
);

export const selectEducation = createSelector(
  selectCreateCvState,
  (appStare: CreateCvState) => appStare?.education
);

export const selectSummary = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.summary
);

export const selectProfSkill = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.professionalSkills
);

export const selectTechSkill = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.technicalSkills
);

export const selectLangSkill = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.languageSkills
);

export const selectWorkExperience = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState?.workExperience
);

  export const selectAllStore = createSelector(
  selectCreateCvState,
  (appState: CreateCvState) => appState
);
