import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInformationModel } from '../../../core/models/user-information/user-information.model';
import * as userInformationSelectors from '../state/create-cv.selectors';
import { CreateCvPageActions } from '../state/create-cv.actions';
import { first, firstValueFrom, Observable, Subscription } from 'rxjs';
import { EducationModel } from '../../../core/models/user-information/education.model';
import { SummaryModel } from '../../../core/models/user-information/summary.model';
import { ProfessionalSkillsModel } from '../../../core/models/user-information/professional-skills.model';
import { TechnicalSkillModel } from '../../../core/models/user-information/technical-skill.model';
import { LanguageSkillsModel } from '../../../core/models/user-information/language-skills.model';
import { WorkExperienceModel } from '../../../core/models/user-information/work-experience.model';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.scss']
})
export class CreateCvComponent implements OnInit, OnDestroy {
  public userInformation: UserInformationModel | undefined;
  private subscriptions: Subscription[] = [];
  date: any;
  title: any;

  public $currentTemplateName: Observable<string | undefined>;
  public $title: Observable<string | undefined>;
  public $userInformation: Observable<UserInformationModel | undefined>;
  public $education: Observable<EducationModel[] | undefined>;
  public $summary: Observable<SummaryModel[] | undefined>;
  public $profSkills: Observable<ProfessionalSkillsModel[] | undefined>;
  public $techSkills: Observable<TechnicalSkillModel[] | undefined>;
  public $langSkills: Observable<LanguageSkillsModel[] | undefined>;
  public $workExperience: Observable<WorkExperienceModel[] | undefined>;

  constructor (private store: Store) {
    this.$currentTemplateName = this.store.select(userInformationSelectors.selectTemplateName);
    this.$title = this.store.select(userInformationSelectors.selectTitle);
    this.$userInformation = this.store.select(userInformationSelectors.selectUserInformation);
    this.$education = this.store.select(userInformationSelectors.selectEducation);
    this.$summary = this.store.select(userInformationSelectors.selectSummary);
    this.$profSkills = this.store.select(userInformationSelectors.selectProfSkill)
    this.$techSkills = this.store.select(userInformationSelectors.selectTechSkill);
    this.$langSkills = this.store.select(userInformationSelectors.selectLangSkill);
    this.$workExperience = this.store.select(userInformationSelectors.selectWorkExperience);
    const getUserInfoSubscription = this.store.select(userInformationSelectors.selectUserInformation).subscribe(data => {
      this.userInformation = data;
    });
    this.subscriptions.push(getUserInfoSubscription);
  }

  ngOnDestroy(): void {
    this.store.dispatch(CreateCvPageActions.leavingPage());
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  public ngOnInit() {
    this.store.dispatch(CreateCvPageActions.opened());
  }

  public async onTitleChanged ($event: any) {
    this.store.dispatch(CreateCvPageActions.titleChanged({ title: $event.target.value }));
  }

  public async onEmailChanged ($event: any) {
    const state = await this.store.select(userInformationSelectors.selectUserInformation).pipe(first()).toPromise();
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, email: $event.target.value } ?? new UserInformationModel() }))
  }

  public async onFirstNameChanged ($event: any) {
    const state = await this.store.select(userInformationSelectors.selectUserInformation).pipe(first()).toPromise();
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, firstName: $event.target.value } ?? new UserInformationModel() }))
  }

  public async onLastNameChanged ($event: any) {
    const state = await this.store.select(userInformationSelectors.selectUserInformation).pipe(first()).toPromise();
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, lastName: $event.target.value } ?? new UserInformationModel() }))
  }

  public async onCountryChanged ($event: any) {
    const state = await this.store.select(userInformationSelectors.selectUserInformation).pipe(first()).toPromise();
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, country: $event.target.value } ?? new UserInformationModel() }))
  }

  public async onCityChanged ($event: any) {
    const state = await this.store.select(userInformationSelectors.selectUserInformation).pipe(first()).toPromise();
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, city: $event.target.value } ?? new UserInformationModel() }));
  }

  public async onAddressChanged ($event: any) {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectUserInformation));
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, address: $event.target.value } ?? new UserInformationModel() }));
  }

  public async onPhoneChanged ($event: any) {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectUserInformation));
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, phone: $event.target.value } ?? new UserInformationModel() }));
  }

  public async onSocialNetworkChanged ($event: any) {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectUserInformation));
    this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, linkToSocialNetwork: $event.target.value } ?? new UserInformationModel() }));
  }

  public async onAddNewEducation () {
    const state = await this.store.select(userInformationSelectors.selectEducation).pipe(first()).toPromise();

    const newEdu = new EducationModel();

    if (state && state.length > 0) {
      newEdu.id = `${(state.length + 1)}`;
      this.store.dispatch(CreateCvPageActions.educationChanged({ education: [...state, newEdu] ?? [] }));
    }
    else {
      newEdu.id = `${1}`;
      this.store.dispatch(CreateCvPageActions.educationChanged({ education: [newEdu] ?? [] }));
    }
  }

  public async onPhotoLoaded ($event: any) {
    const image = $event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async () => {
      const state = await firstValueFrom(this.store.select(userInformationSelectors.selectUserInformation));
      this.store.dispatch(CreateCvPageActions.userInformationChanged({ userInformation: { ...state, photo: reader.result } ?? new UserInformationModel() }));
    });

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public async onAddNewSummary () {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectSummary));

    const newSummary = new SummaryModel();

    if (state && state.length > 0) {
      newSummary.id = `${(state.length + 1)}`;
      this.store.dispatch(CreateCvPageActions.summaryChanged({ summary: [...state, newSummary] ?? [] }));
    }
    else {
      newSummary.id = `${1}`;
      this.store.dispatch(CreateCvPageActions.summaryChanged({ summary: [newSummary] ?? [] }));
    }
  }

  public async onAddNewProfSkill () {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectProfSkill));

    const professionalSkillsModel = new ProfessionalSkillsModel();

    if (state && state.length > 0) {
      professionalSkillsModel.id = `${(state.length + 1)}`;
      this.store.dispatch(CreateCvPageActions.professionalSkillsChanged({ professionalSkills: [...state, professionalSkillsModel] ?? [] }));
    }
    else {
      professionalSkillsModel.id = `${1}`;
      this.store.dispatch(CreateCvPageActions.professionalSkillsChanged({ professionalSkills: [professionalSkillsModel] ?? [] }));
    }
  }

  public async onAddNewTechSkill () {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectTechSkill));

    const technicalSkillModel = new TechnicalSkillModel();

    if (state && state.length > 0) {
      technicalSkillModel.id = `${(state.length + 1)}`;
      this.store.dispatch(CreateCvPageActions.technicalSkillsChanged({ technicalSkills: [...state, technicalSkillModel] ?? [] }));
    }
    else {
      technicalSkillModel.id = `${1}`;
      this.store.dispatch(CreateCvPageActions.technicalSkillsChanged({ technicalSkills: [technicalSkillModel] ?? [] }));
    }
  }

  public async onAddNewLangSkill () {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectLangSkill));

    const languageSkillsModel = new LanguageSkillsModel();

    if (state && state.length > 0) {
      languageSkillsModel.id = `${(state.length + 1)}`;
      this.store.dispatch(CreateCvPageActions.languageSkillsChanged({ languageSkills: [...state, languageSkillsModel] ?? [] }));
    }
    else {
      languageSkillsModel.id = `${1}`;
      this.store.dispatch(CreateCvPageActions.languageSkillsChanged({ languageSkills: [languageSkillsModel] ?? [] }));
    }
  }

  public async onAddNewWorkExperience () {
    const state = await firstValueFrom(this.store.select(userInformationSelectors.selectWorkExperience));

    const workExperienceModel = new WorkExperienceModel();

    if (state && state.length > 0) {
      workExperienceModel.id = `${(state.length + 1)}`;
      this.store.dispatch(CreateCvPageActions.workExperienceChanged({ workExperience: [...state, workExperienceModel] ?? [] }));
    }
    else {
      workExperienceModel.id = `${1}`;
      this.store.dispatch(CreateCvPageActions.workExperienceChanged({ workExperience: [workExperienceModel] ?? [] }));
    }
  }

  public downloadJson () {
    this.store.dispatch(CreateCvPageActions.downloadJsonData());
  }

  public importJson ($event: any) {
    const data = $event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(data);

    reader.addEventListener('load', async () => {
      localStorage.setItem('create-cv-storage', reader.result as string);
      document.location.reload();
    });
  }
}
