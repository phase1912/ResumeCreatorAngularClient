import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInformationModel } from '../../../../core/models/user-information/user-information.model';
import { EducationModel } from '../../../../core/models/user-information/education.model';
import { SummaryModel } from '../../../../core/models/user-information/summary.model';
import { ProfessionalSkillsModel } from '../../../../core/models/user-information/professional-skills.model';
import { TechnicalSkillModel } from '../../../../core/models/user-information/technical-skill.model';
import { LanguageSkillsModel } from '../../../../core/models/user-information/language-skills.model';
import { WorkExperienceModel } from '../../../../core/models/user-information/work-experience.model';
import { Store } from '@ngrx/store';
import * as userInformationSelectors from '../../state/create-cv.selectors';
import { ProfSkillType } from '../../../../core/Constants/prof-skill-type';

@Component({
  selector: 'simple-template',
  templateUrl: './simple-template.component.html',
  styleUrls: ['./simple-template.component.scss']
})
export class SimpleTemplateComponent {
  public $title: Observable<string | undefined>;
  public $userInformation: Observable<UserInformationModel | undefined>;
  public $education: Observable<EducationModel[] | undefined>;
  public $summary: Observable<SummaryModel[] | undefined>;
  public $profSkills: Observable<ProfessionalSkillsModel[] | undefined>;
  public $techSkills: Observable<TechnicalSkillModel[] | undefined>;
  public $langSkills: Observable<LanguageSkillsModel[] | undefined>;
  public $workExperience: Observable<WorkExperienceModel[] | undefined>;

  constructor (private store: Store) {
    this.$title = this.store.select(userInformationSelectors.selectTitle);
    this.$userInformation = this.store.select(userInformationSelectors.selectUserInformation);
    this.$education = this.store.select(userInformationSelectors.selectEducation);
    this.$summary = this.store.select(userInformationSelectors.selectSummary);
    this.$profSkills = this.store.select(userInformationSelectors.selectProfSkill);
    this.$techSkills = this.store.select(userInformationSelectors.selectTechSkill);
    this.$langSkills = this.store.select(userInformationSelectors.selectLangSkill);
    this.$workExperience = this.store.select(userInformationSelectors.selectWorkExperience);
  }

  public getMothNameWithYear(val: any, isEndDate = false): string {
    if (!val && isEndDate) {
      return 'Present';
    }

    if (val) {
      if (val instanceof Date) {
        return `${val.toLocaleString('en-GB', { month: 'long' })} ${val.getFullYear()}`;
      }
      else {
        const date = new Date(val);

        return `${date.toLocaleString('en-GB', { month: 'long' })} ${date.getFullYear()}`;
      }
    }
    return "";
  }

  public filterLanguages(item: TechnicalSkillModel): boolean {
    return item.type === ProfSkillType.programmingLanguage;
  }

  public filterTech(item: TechnicalSkillModel): boolean {
    return item.type === ProfSkillType.frameworkTechnology;
  }

  public filterTools(item: TechnicalSkillModel): boolean {
    return item.type === ProfSkillType.devTool;
  }

  public filterLibs(item: TechnicalSkillModel): boolean {
    return item.type === ProfSkillType.library;
  }
}
