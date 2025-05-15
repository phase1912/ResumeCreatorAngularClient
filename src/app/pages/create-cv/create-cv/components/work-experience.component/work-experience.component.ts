import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateCvPageActions } from '../../../state/create-cv.actions';
import { WorkExperienceModel } from '../../../../../core/models/user-information/work-experience.model';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
  public startDate: any;
  public endDate: any;
  @Input() workExperience: WorkExperienceModel | undefined;

  constructor (private store: Store) {
  }

  public async onNameChangeString($event: any, fieldName: string) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeWorkExperienceData({ id: this.workExperience?.id ?? '', field: fieldName, value: $event.target.value }));
  }

  public async onChangeDate($event: any, fieldName: string) {
    if (!$event) return;
    this.store.dispatch(CreateCvPageActions.changeWorkExperienceData({ id: this.workExperience?.id ?? '', field: fieldName, value: $event }));
  }

  public confirm(id: string) {
    this.store.dispatch(CreateCvPageActions.workExperienceRemoved({ id }));
  }

  public cancel () {

  }

  public async onAddNewProjectExperience () {
    this.store.dispatch(CreateCvPageActions.workProjectAdded({ workExperienceId: this.workExperience?.id ?? '' }));
  }

  public confirmDeleteProject (id: string) {
    this.store.dispatch(CreateCvPageActions.workProjectRemoved({ id, workExperienceId: this.workExperience?.id?? '' }));
  }

  public changeProjectData (id: string, fieldName: string, $event: any) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeWorkProjectData({ id, workExperienceId: this.workExperience?.id ?? '', field: fieldName, value: $event.target?.value }));
  }

  public changeProjectDataDate (id: string, fieldName: string, $event: any) {
    if (!$event) return;
    this.store.dispatch(CreateCvPageActions.changeWorkProjectData({ id, workExperienceId: this.workExperience?.id ?? '', field: fieldName, value: $event }));
  }

  public addNewResp (projectId: string) {
    this.store.dispatch(CreateCvPageActions.projResponcibAdded({ workExperienceId: this.workExperience?.id ?? '', projectId }));
  }

  public removeResp (id: string, projectId: string) {
    this.store.dispatch(CreateCvPageActions.projResponsibRemoved({ workExperienceId: this.workExperience?.id ?? '', projectId, id }));
  }

  public respDataChanged (id: string, projectId: string, fieldName: string, $event: any) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeResponsibData({ workExperienceId: this.workExperience?.id ?? '', projectId, id, field: fieldName, value: $event.target?.value }));
  }

  public addNewTech (projectId: string) {
    this.store.dispatch(CreateCvPageActions.projTechAdded({ workExperienceId: this.workExperience?.id ?? '', projectId }));
  }

  public removeTech (id: string, projectId: string) {
    this.store.dispatch(CreateCvPageActions.projTechRemoved({ workExperienceId: this.workExperience?.id ?? '', projectId, id }));
  }

  public techDataChanged (id: string, projectId: string, fieldName: string, $event: any) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeProjTechData({ workExperienceId: this.workExperience?.id ?? '', projectId, id, field: fieldName, value: $event.target?.value }));
  }
}
