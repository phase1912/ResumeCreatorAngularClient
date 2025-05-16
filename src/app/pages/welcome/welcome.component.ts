import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as userInformationSelectors from '../create-cv/state/create-cv.selectors';
import { CreateCvPageActions } from '../create-cv/state/create-cv.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public $currentTemplateName: Observable<string | undefined>;
  date: any;

  constructor(private store: Store) {
    this.$currentTemplateName = this.store.select(userInformationSelectors.selectTemplateName);
  }

  public onTemplateChanged(name: string) {
    this.store.dispatch(CreateCvPageActions.templateNameChanged({ templateName: name }));
  }
}
