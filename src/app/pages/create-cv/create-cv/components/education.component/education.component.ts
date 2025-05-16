import { Component, Input } from '@angular/core';
import { CreateCvPageActions } from '../../../state/create-cv.actions';
import { Store } from '@ngrx/store';
import { EducationModel } from '../../../../../core/models/user-information/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  public startDate: any;
  public endDate: any;
  @Input() edu: EducationModel | undefined;

  constructor (private store: Store) {
  }

  public async onNameChangeString($event: any, fieldName: string) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeEducationData({ id: this.edu?.id ?? '', field: fieldName, value: $event.target.value }));
  }

  public async onChangeDate($event: any, fieldName: string) {
    if (!$event) return;
    this.store.dispatch(CreateCvPageActions.changeEducationData({ id: this.edu?.id ?? '', field: fieldName, value: $event }));
  }

  public confirm(id: string) {
    this.store.dispatch(CreateCvPageActions.removeEducation({ id }));
  }

  public cancel () {

  }
}
