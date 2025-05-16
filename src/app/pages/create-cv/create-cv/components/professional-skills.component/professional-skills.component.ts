import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateCvPageActions } from '../../../state/create-cv.actions';
import { ProfessionalSkillsModel } from '../../../../../core/models/user-information/professional-skills.model';

@Component({
  selector: 'app-prof-skill',
  templateUrl: './professional-skills.component.html',
  styleUrls: ['./professional-skills.component.scss']
})
export class ProfessionalSkillsComponent {
  @Input() profSkill: ProfessionalSkillsModel | undefined;

  constructor (private store: Store) {
  }

  public async onRemove (id: string) {
    this.store.dispatch(CreateCvPageActions.professionalSkillsRemoved({ id }));
  }

  public async onChangeData ($event: any) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeProfessionalSkillsData({ id: this.profSkill?.id ?? '', data: $event.target.value }));
  }
}
