import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInformationModel } from '../../../../core/models/user-information/user-information.model';
import { Store } from '@ngrx/store';
import * as userInformationSelectors from '../../state/create-cv.selectors';
import { EducationModel } from '../../../../core/models/user-information/education.model';
import { SummaryModel } from '../../../../core/models/user-information/summary.model';
import { ProfessionalSkillsModel } from '../../../../core/models/user-information/professional-skills.model';
import { TechnicalSkillModel } from '../../../../core/models/user-information/technical-skill.model';
import { LanguageSkillsModel } from '../../../../core/models/user-information/language-skills.model';
import { LanguageLevelModel } from '../../../../core/Constants/language-level.model';
import { WorkExperienceModel } from '../../../../core/models/user-information/work-experience.model';

@Component({
  selector: 'default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
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

  public trimDate(val: any): string {
    if (val) {
      if (val instanceof Date) {
        return `${val.getFullYear()}`;
      }
      else {
        const splits = val.split("-");

        return splits[0];
      }
    }
    return "";
  }

  public calculateLangPercentage (val: string): number {
    switch (val) {
      case LanguageLevelModel.PreIntermediate:
        return 25;
      case LanguageLevelModel.Intermediate:
        return 50;
      case LanguageLevelModel.UpperIntermediate:
        return 75;
      case LanguageLevelModel.Advanced:
        return 100;
      default:
        return 0;
    }
  }

  public getMothNameWithYear(val: any): string {
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

  public getDifferenceInDates(startDate: any, endDate: any) {
    const fixedStartDate: Date = startDate instanceof Date ? startDate : new Date(startDate);
    const fixedEndDate: Date = endDate instanceof Date ? endDate : new Date(endDate);

    const diff = Math.floor(fixedEndDate.getTime() - fixedStartDate.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff/day);
    const months = Math.floor(days/31);
    const years = Math.floor(months/12);
    const restMonths = months - years * 12

    return isNaN(years) ? '' : `${years} years, ${restMonths} months`
  }
}
