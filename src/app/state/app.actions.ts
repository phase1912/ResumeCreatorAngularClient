import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CreateCVPortalActions = createActionGroup({
  source: 'Create CV portal actions',
  events: {
    languageChanged: props<{ language: string }>(),
    somethingWentWrong: emptyProps(),
  }
});
