import { UserInformationModel } from '../../../core/models/user-information/user-information.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CreateCvPageActions } from './create-cv.actions';
import { EducationModel } from '../../../core/models/user-information/education.model';
import { SummaryModel } from '../../../core/models/user-information/summary.model';
import { ProfessionalSkillsModel } from '../../../core/models/user-information/professional-skills.model';
import { TechnicalSkillModel } from '../../../core/models/user-information/technical-skill.model';
import { LanguageSkillsModel } from '../../../core/models/user-information/language-skills.model';
import { WorkExperienceModel } from '../../../core/models/user-information/work-experience.model';

export class CreateCvState {
  public templateName: string | undefined;

  public title: string | undefined;

  public userInformation: UserInformationModel | undefined;

  public education: EducationModel[] | undefined;

  public summary: SummaryModel[] | undefined;

  public professionalSkills: ProfessionalSkillsModel[] | undefined;

  public technicalSkills: TechnicalSkillModel[] | undefined;

  public languageSkills: LanguageSkillsModel[] | undefined;

  public workExperience: WorkExperienceModel[] | undefined;
}

export const initialState: CreateCvState = new CreateCvState();


export const createCvFeature = createFeature({
  name: 'createCvState',
  reducer: createReducer(
    initialState,
    on(CreateCvPageActions.templateNameChanged, (state, { templateName }) => ({ ...state, templateName: templateName })),
    on(CreateCvPageActions.titleChanged, (state, { title }) => ({ ...state, title: title })),
    on(CreateCvPageActions.userInformationChanged, (state, { userInformation }) => ({ ...state, userInformation: userInformation })),
    on(CreateCvPageActions.userInformationLoaded, (state, { userInformation }) => ({ ...state, userInformation: userInformation })),
    on(CreateCvPageActions.updateStateFromLocalStorage, (state, { createCvState }) => ({...state, ...createCvState })),
    on(CreateCvPageActions.educationChanged, (state, { education }) => ({...state, education: education })),
    on(CreateCvPageActions.summaryChanged, (state, { summary }) => ({...state, summary: summary })),
    on(CreateCvPageActions.professionalSkillsChanged, (state, { professionalSkills }) => ({...state, professionalSkills: professionalSkills })),
    on(CreateCvPageActions.technicalSkillsChanged, (state, { technicalSkills }) => ({...state, technicalSkills: technicalSkills })),
    on(CreateCvPageActions.languageSkillsChanged, (state, { languageSkills }) => ({...state, languageSkills: languageSkills })),
    on(CreateCvPageActions.workExperienceChanged, (state, { workExperience }) => ({...state, workExperience: workExperience })),
  ),
});

