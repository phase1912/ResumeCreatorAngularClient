import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserInformationModel } from '../../../core/models/user-information/user-information.model';
import { CreateCvState } from './create-cv.state';
import { EducationModel } from '../../../core/models/user-information/education.model';
import { SummaryModel } from '../../../core/models/user-information/summary.model';
import { ProfessionalSkillsModel } from '../../../core/models/user-information/professional-skills.model';
import { TechnicalSkillModel } from '../../../core/models/user-information/technical-skill.model';
import { LanguageSkillsModel } from '../../../core/models/user-information/language-skills.model';
import { WorkExperienceModel } from '../../../core/models/user-information/work-experience.model';

export const CreateCvPageActions = createActionGroup({
  source: 'Create CV Page',
  events: {
    opened: emptyProps(),
    updated: emptyProps(),

    templateNameChanged: props<{ templateName: string }>(),

    titleChanged: props<{ title: string }>(),

    userInformationChanged: props<{ userInformation: UserInformationModel }>(),
    userInformationLoaded: props<{ userInformation: UserInformationModel }>(),
    updateStateFromLocalStorage: props<{ createCvState: CreateCvState }>(),

    educationChanged: props<{ education: EducationModel[] }>(),
    removeEducation: props<{ id: string }>(),
    changeEducationData: props<{ id: string, field: string, value: string }>(),

    summaryChanged: props<{ summary: SummaryModel[] }>(),
    removeSummary: props<{ id: string }>(),
    changeSummaryData: props<{ id: string, data: string }>(),

    professionalSkillsChanged: props<{ professionalSkills: ProfessionalSkillsModel[] }>(),
    professionalSkillsRemoved: props<{ id: string }>(),
    changeProfessionalSkillsData: props<{ id: string, data: string }>(),

    technicalSkillsChanged: props<{ technicalSkills: TechnicalSkillModel[] }>(),
    technicalSkillsRemoved: props<{ id: string }>(),
    changeTechnicalData: props<{ id: string, data: string, level: number, typeOfSkill: string }>(),

    languageSkillsChanged: props<{ languageSkills: LanguageSkillsModel[] }>(),
    languageSkillsRemoved: props<{ id: string }>(),
    changeLanguageSkillsData: props<{ id: string, data: string, level: string }>(),

    workExperienceChanged: props<{ workExperience: WorkExperienceModel[] }>(),
    workExperienceRemoved: props<{ id: string }>(),
    changeWorkExperienceData: props<{ id: string, field: string, value: string }>(),
    workProjectAdded: props<{ workExperienceId: string }>(),
    workProjectRemoved: props<{ workExperienceId: string, id: string }>(),
    changeWorkProjectData: props<{ workExperienceId: string, id: string, field: string, value: string }>(),
    projResponcibAdded: props<{ workExperienceId: string, projectId: string }>(),
    projResponsibRemoved: props<{ workExperienceId: string, projectId: string, id: string }>(),
    changeResponsibData: props<{ workExperienceId: string, projectId: string, id: string, field: string, value: string }>(),
    projTechAdded: props<{ workExperienceId: string, projectId: string }>(),
    projTechRemoved: props<{ workExperienceId: string, projectId: string, id: string }>(),
    changeProjTechData: props<{ workExperienceId: string, projectId: string, id: string, field: string, value: string }>(),

    downloadJsonData: emptyProps(),

    leavingPage: emptyProps(),
    empty: emptyProps(),
  }
});
