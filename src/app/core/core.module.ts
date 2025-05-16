import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExtendObjectsService } from './services/extend-objects.service';
import { ExportToPdfService } from './services/export-to-pdf.service';
import { CvPagesApiClientService } from './services/cv-pages-api-client.service';
import { FilterDataPipe } from './pipe/filter-data.pipe';

@NgModule({
  declarations: [
    FilterDataPipe
  ],
  imports: [
    HttpClientModule,
  ],
  providers: [
    ExtendObjectsService,
    ExportToPdfService,
    CvPagesApiClientService
  ],
  exports: [
    FilterDataPipe
  ],
})
export class CoreModule { }
