import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateCvPageActions } from '../../../state/create-cv.actions';
import { LanguageSkillsModel } from '../../../../../core/models/user-information/language-skills.model';
import { firstValueFrom } from 'rxjs';
import * as userInformationSelectors from '../../../state/create-cv.selectors';
import { LanguageLevelModel } from '../../../../../core/Constants/language-level.model';

@Component({
  selector: 'app-lang-skill',
  templateUrl: './language-skill.component.html',
  styleUrls: ['./language-skill.component.scss']
})
export class LanguageSkillComponent {
  @Input() langSkill: LanguageSkillsModel | undefined;
  radioValue: any;

  constructor (private store: Store) {
  }

  public async onRemove (id: string) {
    this.store.dispatch(CreateCvPageActions.languageSkillsRemoved({ id }));
  }

  public async onChangeSummary ($event: any) {
    if (!$event.target?.value) return;
    const current = await this.getCurrentFromStore();

    if (current) {
      this.store.dispatch(CreateCvPageActions.changeLanguageSkillsData({ id: this.langSkill?.id ?? '', data: $event.target.value, level: current.level ?? '' }));
    }
  }

  public async onChangePercentage ($event: any) {
    if (!$event) return;

    const current = await this.getCurrentFromStore();

    if (current) {
      this.store.dispatch(CreateCvPageActions.changeLanguageSkillsData({ id: this.langSkill?.id ?? '', data: current.summary ?? '', level: $event }));
    }
  }

  private async getCurrentFromStore () {
    const all = await firstValueFrom(this.store.select(userInformationSelectors.selectLangSkill));

    return  all?.find(x => x.id === this.langSkill?.id);
  }

  protected readonly LanguageLevelModel = LanguageLevelModel;
}
