import { Component, Input } from '@angular/core';
import { CreateCvPageActions } from '../../../state/create-cv.actions';
import { Store } from '@ngrx/store';
import { SummaryModel } from '../../../../../core/models/user-information/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() summary: SummaryModel | undefined;

  constructor (private store: Store) {
  }

  public async onRemoveSummary (id: string) {
    this.store.dispatch(CreateCvPageActions.removeSummary({ id }));
  }

  public async onChangeData ($event: any) {
    if (!$event.target?.value) return;
    this.store.dispatch(CreateCvPageActions.changeSummaryData({ id: this.summary?.id ?? '', data: $event.target.value }));
  }
}
