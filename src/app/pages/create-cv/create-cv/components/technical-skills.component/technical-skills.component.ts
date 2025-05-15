import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateCvPageActions } from '../../../state/create-cv.actions';
import { TechnicalSkillModel } from '../../../../../core/models/user-information/technical-skill.model';
import * as userInformationSelectors from '../../../state/create-cv.selectors';
import { firstValueFrom } from 'rxjs';
import { ProfSkillType } from '../../../../../core/Constants/prof-skill-type';

@Component({
  selector: 'app-tech-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.scss']
})
export class TechnicalSkillsComponent {
  @Input() techSkill: TechnicalSkillModel | undefined;

  constructor (private store: Store) {
  }

  public async onRemove (id: string) {
    this.store.dispatch(CreateCvPageActions.technicalSkillsRemoved({ id }));
  }

  public async onChangeSummary ($event: any) {
    if (!$event.target?.value) return;
    const current = await this.getCurrentFromStore();

    if (current) {
      this.store.dispatch(CreateCvPageActions.changeTechnicalData({ id: this.techSkill?.id ?? '', data: $event.target.value, level: current.levelPercentage ?? 0, typeOfSkill: current.type ?? '' }));
    }
  }

  public async onChangePercentage ($event: any) {
    if (!$event.target?.value) return;
    const number = parseInt($event.target?.value)
    if (number < 0 || number > 100) return;

    const current = await this.getCurrentFromStore();

    if (current) {
      this.store.dispatch(CreateCvPageActions.changeTechnicalData({ id: this.techSkill?.id ?? '', data: current.summary ?? '', level: $event.target.value, typeOfSkill: current.type ?? '' }));
    }
  }

  private async getCurrentFromStore () {
    const all = await firstValueFrom(this.store.select(userInformationSelectors.selectTechSkill));

    return  all?.find(x => x.id === this.techSkill?.id);
  }

  protected readonly ProfSkillType = ProfSkillType;

  public async onChangeType ($event: any) {
    if (!$event) return;

    const current = await this.getCurrentFromStore();

    if (current) {
      this.store.dispatch(CreateCvPageActions.changeTechnicalData({ id: this.techSkill?.id ?? '', data: current.summary ?? '', level: current.levelPercentage ?? 0, typeOfSkill: $event }));
    }
  }
}
