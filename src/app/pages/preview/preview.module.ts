import { NgModule } from '@angular/core';
import { PreviewComponent } from './components/preview.component';
import { PreviewRoutingModule } from './preview-routing.module';
import { CreateCvModule } from '../create-cv/create-cv.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AsyncPipe, NgIf } from '@angular/common';

@NgModule({
    imports: [PreviewRoutingModule, CreateCvModule, NzButtonModule, NzIconModule, AsyncPipe, NgIf],
  declarations: [PreviewComponent],
})
export class PreviewModule { }
