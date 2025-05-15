import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CreateCvPageActions } from './create-cv.actions';
import { exhaustMap, first, firstValueFrom, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as userInformationSelectors from './create-cv.selectors';
import { EducationModel } from '../../../core/models/user-information/education.model';
import { SummaryModel } from '../../../core/models/user-information/summary.model';
import { ProfessionalSkillsModel } from '../../../core/models/user-information/professional-skills.model';
import { TechnicalSkillModel } from '../../../core/models/user-information/technical-skill.model';
import { LanguageSkillsModel } from '../../../core/models/user-information/language-skills.model';
import { WorkExperienceModel } from '../../../core/models/user-information/work-experience.model';
import { WorkProjectsModel } from '../../../core/models/user-information/work-projects.model';
import { ExtendObjectsService } from '../../../core/services/extend-objects.service';
import { GeneralSkillModel } from '../../../core/models/user-information/general-skill.model';

// export const loadUserInformation = createEffect(
//   (actions$ = inject(Actions)) => {
//     return actions$.pipe(
//       ofType(CreateCvPageActions.opened, CreateCvPageActions.updated),
//       exhaustMap(() =>
//        // interval().pipe(take(1), map(data => CreateCvPageActions.userInformationLoaded({userInformation: {country: 'Poland'}})))
//         new Observable(observer => {
//           setTimeout(() => {
//             observer.next(generateTmpData())
//             observer.complete()
//           }, 3000)
//
//         }).pipe(map(data => CreateCvPageActions.userInformationLoaded({ userInformation: { country: 'Poland' }})))
//       )
//     );
//   },
//   { functional: true }
// );

export const loadUserInformation = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.opened),
      exhaustMap(() =>
        new Observable(observer => {
          setTimeout(() => {
            observer.next(generateTmpData())
            observer.complete()
          }, 1)

        }).pipe(map(data => {
          const savedStateStr = localStorage.getItem('create-cv-storage');
          let result;

          if (savedStateStr) {
            const savedState = JSON.parse(savedStateStr) || {};

            if (savedState && savedState.createCvState) {
              result = savedState.createCvState;
            }
            else {
              result = data;
            }
          }
          return CreateCvPageActions.updateStateFromLocalStorage({ createCvState: result });
        }))
      )
    );
  },
  { functional: true }
);

export const removeEducation = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.removeEducation),
      exhaustMap(async (action) => {
        const data = await store$.select(userInformationSelectors.selectEducation).pipe(first()).toPromise();
        let newData = data?.filter(x => x.id !== action.id);
        newData = newData?.sort(function (a, b) {
          return sort(a.id, b.id, false);
        });
        return CreateCvPageActions.educationChanged({ education: newData ?? [] });
      })
    );
  },
  { functional: true }
);

export const changeEducationData = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeEducationData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectEducation));

        const current = data?.find(x => x.id === action?.id);

        if (current) {
          const newItem = new EducationModel();

          extendService$.extendObjectAndUpdateField(current, newItem, action.field, action.value);

          let newData = data?.filter(x => x.id !== action.id);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.educationChanged({ education: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const pageLeaving = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.leavingPage, CreateCvPageActions.updated),
      exhaustMap(() =>
         store$.select(userInformationSelectors.selectAllStore).pipe(map(data => {
          //localStorage.setItem('create-cv-storage', JSON.stringify(data));
          return CreateCvPageActions.empty();
        }))
      )
    );
  },
  { functional: true }
);

export const removeSummary = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.removeSummary),
      exhaustMap(async (action) => {
        const data = await store$.select(userInformationSelectors.selectSummary).pipe(first()).toPromise();
        let newData = data?.filter(x => x.id !== action.id);
        newData = newData?.sort(function (a, b) {
          return sort(a.id, b.id, false);
        });
        return CreateCvPageActions.summaryChanged({ summary: newData ?? [] });
      })
    );
  },
  { functional: true }
);

export const changeSummaryData = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeSummaryData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectSummary));

        const current = data?.find(x => x.id === action?.id);

        if (current) {
          const newItem = new SummaryModel();
          newItem.id = current.id;
          newItem.summary = action.data

          let newData = data?.filter(x => x.id !== action.id);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.summaryChanged({ summary: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeProfSkill = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.professionalSkillsRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectProfSkill));
        let newData = data?.filter(x => x.id !== action.id);
        newData = newData?.sort(function (a, b) {
          return sort(a.id, b.id, false);
        });
        return CreateCvPageActions.professionalSkillsChanged({ professionalSkills: newData ?? [] });
      })
    );
  },
  { functional: true }
);

export const changeProfSkillsData = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeProfessionalSkillsData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectProfSkill));

        const current = data?.find(x => x.id === action?.id);

        if (current) {
          const newItem = new ProfessionalSkillsModel();
          newItem.id = current.id;
          newItem.summary = action.data;

          let newData = data?.filter(x => x.id !== action.id);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.professionalSkillsChanged({ professionalSkills: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeTechSkill = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.technicalSkillsRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectTechSkill));
        let newData = data?.filter(x => x.id !== action.id);
        newData = newData?.sort(function (a, b) {
          return sort(parseInt(`${a.levelPercentage}`), parseInt(`${b.levelPercentage}`), true);
        });
        return CreateCvPageActions.technicalSkillsChanged({ technicalSkills: newData ?? [] });
      })
    );
  },
  { functional: true }
);

export const changeTechSkillsData = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeTechnicalData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectTechSkill));

        const current = data?.find(x => x.id === action?.id);

        if (current) {
          const newItem = new TechnicalSkillModel();
          newItem.id = current.id;
          newItem.summary = action.data;
          newItem.levelPercentage = action.level;
          newItem.type = action.typeOfSkill;

          let newData = data?.filter(x => x.id !== action.id);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(parseInt(`${a.levelPercentage}`), parseInt(`${b.levelPercentage}`), true);
          });
          return CreateCvPageActions.technicalSkillsChanged({ technicalSkills: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeLangSkill = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.languageSkillsRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectLangSkill));
        let newData = data?.filter(x => x.id !== action.id);
        newData = newData?.sort(function (a, b) {
          return sort(a.id, b.id, false);
        });
        return CreateCvPageActions.languageSkillsChanged({ languageSkills: newData ?? [] });
      })
    );
  },
  { functional: true }
);

export const changeLangSkillsData = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeLanguageSkillsData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectLangSkill));

        const current = data?.find(x => x.id === action?.id);

        if (current) {
          const newItem = new LanguageSkillsModel();
          newItem.id = current.id;
          newItem.summary = action.data;
          newItem.level = action.level;

          let newData = data?.filter(x => x.id !== action.id);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.languageSkillsChanged({ languageSkills: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeWorkExperience = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.workExperienceRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));
        let newData = data?.filter(x => x.id !== action.id);
        newData = newData?.sort(function (a, b) {
          return sort(a.id, b.id, false);
        });
        return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
      })
    );
  },
  { functional: true }
);

export const changeWorkExperienceData = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeWorkExperienceData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.id);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObjectAndUpdateField(current, newItem, action.field, action.value);

          let newData = data?.filter(x => x.id !== action.id);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const addNewProjectToWorkExperience = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
   ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.workProjectAdded),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          const project = new WorkProjectsModel();
          if (newItem.projects && newItem.projects.length > 0) {
            project.id = `${(newItem.projects.length + 1)}`;

            newItem.projects = newItem.projects.map(x => {
              const p = new WorkProjectsModel();

              extendService$.extendObject(x, p);

              return p;
            });

            newItem.projects = newItem.projects?.sort(function (a, b) {
              return sort(a.id, b.id, false);
            });
          }
          else {
            newItem.projects = [];
            project.id = `${1}`;
          }

          newItem.projects.push(project);

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeProjectFromWorkExperience = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.workProjectRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects =  current.projects?.filter(x => x.id !== action.id);
          if (newItem.projects && newItem.projects.length > 0) {
            newItem.projects = newItem.projects?.sort(function (a, b) {
              return sort(a.id, b.id, false);
            });
          }

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const changeProjectDataInWorkExperience = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeWorkProjectData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            if (x.id === action.id) {
              extendService$.extendObjectAndUpdateField(x, p, action.field, action.value);
            }
            else {
              extendService$.extendObject(x, p);
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const addNewResponsibilityToProject = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.projResponcibAdded),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            extendService$.extendObject(x, p);
            const restToAdd = new GeneralSkillModel();
            if (x.id === action.projectId) {
              if (x.responsibilities && x.responsibilities.length > 0) {
                p.responsibilities = x.responsibilities.map(f => {
                  const r = new GeneralSkillModel();
                  extendService$.extendObject(f, r);

                  return r;
                });

                restToAdd.id = `${(p.responsibilities.length + 1)}`

                p.responsibilities.push(restToAdd);

                p.responsibilities = p.responsibilities?.sort(function (a, b) {
                  return sort(a.id, b.id, false);
                });
              }
              else {
                p.responsibilities = [];
                restToAdd.id = `${1}`
                p.responsibilities.push(restToAdd);
              }
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeResponsibilityFromProject = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.projResponsibRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            extendService$.extendObject(x, p);
            if (x.id === action.projectId) {
              if (x.responsibilities && x.responsibilities.length > 0) {
                p.responsibilities = x.responsibilities.map(f => {
                  const r = new GeneralSkillModel();
                  extendService$.extendObject(f, r);

                  return r;
                }).filter(ff => ff.id !== action.id);

                p.responsibilities = p.responsibilities?.sort(function (a, b) {
                  return sort(a.id, b.id, false);
                });
              }
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const changeResponsibilityInProject = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeResponsibData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            extendService$.extendObject(x, p);
            if (x.id === action.projectId) {
              if (x.responsibilities && x.responsibilities.length > 0) {
                p.responsibilities = x.responsibilities.map(f => {
                  const r = new GeneralSkillModel();

                  if (f.id === action.id) {
                    extendService$.extendObjectAndUpdateField(f, r, action.field, action.value)
                  }
                  else {
                    extendService$.extendObject(f, r);
                  }

                  return r;
                });

                p.responsibilities = p.responsibilities?.sort(function (a, b) {
                  return sort(a.id, b.id, false);
                });
              }
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const addNewTechToProject = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.projTechAdded),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            extendService$.extendObject(x, p);
            const restToAdd = new TechnicalSkillModel();
            if (x.id === action.projectId) {
              if (x.toolsAndTechnologies && x.toolsAndTechnologies.length > 0) {
                p.toolsAndTechnologies = x.toolsAndTechnologies.map(f => {
                  const r = new TechnicalSkillModel();
                  extendService$.extendObject(f, r);

                  return r;
                });

                restToAdd.id = `${(p.toolsAndTechnologies.length + 1)}`

                p.toolsAndTechnologies.push(restToAdd);

                p.toolsAndTechnologies = p.toolsAndTechnologies?.sort(function (a, b) {
                  return sort(a.id, b.id, false);
                });
              }
              else {
                p.toolsAndTechnologies = [];
                restToAdd.id = `${1}`
                p.toolsAndTechnologies.push(restToAdd);
              }
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const removeTechFromProject = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.projTechRemoved),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            extendService$.extendObject(x, p);
            if (x.id === action.projectId) {
              if (x.toolsAndTechnologies && x.toolsAndTechnologies.length > 0) {
                p.toolsAndTechnologies = x.toolsAndTechnologies.map(f => {
                  const r = new TechnicalSkillModel();
                  extendService$.extendObject(f, r);

                  return r;
                }).filter(ff => ff.id !== action.id);

                p.toolsAndTechnologies = p.toolsAndTechnologies?.sort(function (a, b) {
                  return sort(a.id, b.id, false);
                });
              }
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const changeTechInProject = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store),
   extendService$ = inject(ExtendObjectsService)
  ) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.changeProjTechData),
      exhaustMap(async (action) => {
        const data = await firstValueFrom(store$.select(userInformationSelectors.selectWorkExperience));

        const current = data?.find(x => x.id === action?.workExperienceId);

        if (current) {
          const newItem = new WorkExperienceModel();

          extendService$.extendObject(current, newItem);

          newItem.projects = newItem.projects?.map(x => {
            const p = new WorkProjectsModel();
            extendService$.extendObject(x, p);
            if (x.id === action.projectId) {
              if (x.toolsAndTechnologies && x.toolsAndTechnologies.length > 0) {
                p.toolsAndTechnologies = x.toolsAndTechnologies.map(f => {
                  const r = new TechnicalSkillModel();

                  if (f.id === action.id) {
                    extendService$.extendObjectAndUpdateField(f, r, action.field, action.value)
                  }
                  else {
                    extendService$.extendObject(f, r);
                  }

                  return r;
                });

                p.toolsAndTechnologies = p.toolsAndTechnologies?.sort(function (a, b) {
                  return sort(a.id, b.id, false);
                });
              }
            }

            return p;
          });

          newItem.projects = newItem.projects?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });

          let newData = data?.filter(x => x.id !== action.workExperienceId);
          newData?.push(newItem);
          newData = newData?.sort(function (a, b) {
            return sort(a.id, b.id, false);
          });
          return CreateCvPageActions.workExperienceChanged({ workExperience: newData ?? [] });
        }

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

export const downloadJsonData = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(CreateCvPageActions.downloadJsonData),
      exhaustMap(async (action) => {

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('create-cv-storage') ?? '');
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", 'exportData' + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        return CreateCvPageActions.empty();
      })
    );
  },
  { functional: true }
);

const sort = (a: any, b: any, isSortByDesc: boolean) => {
  if (isSortByDesc) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    // nameFromA === nameFromB
    return 0;
  }
  else {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // nameFromA === nameFromB
    return 0;
  }
}

const generateTmpData = () => {
  return { country: 'Poland' };
}
