import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CreateCvPageActions } from '../../create-cv/state/create-cv.actions';
import { Store } from '@ngrx/store';
import { ExportToPdfService } from '../../../core/services/export-to-pdf.service';
import { firstValueFrom, Observable } from 'rxjs';
import * as userInformationSelectors from '../../create-cv/state/create-cv.selectors';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public $currentTemplateName: Observable<string | undefined>;
  @ViewChild('dataToExport', { static: false, read: ElementRef }) public dataToExport: ElementRef | undefined;

  constructor (private store: Store, private exportToPdfService: ExportToPdfService) {
    this.$currentTemplateName = this.store.select(userInformationSelectors.selectTemplateName);
  }

  public ngOnInit() {
    this.store.dispatch(CreateCvPageActions.opened());
  }

  public async saveToPdf(): Promise<void> {
    const title = await firstValueFrom(this.store.select(userInformationSelectors.selectTitle));
    //this.exportToPdfService.savePDFUsingLibJsPdf(this.dataToExport); // option 1 - got not good result
    this.exportToPdfService.printUsingBrowserFacilities(this.dataToExport, title ?? 'cv-Bohdan-Razhyk');
  }
}
