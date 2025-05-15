import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch/transition-patch.module';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    FormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzCardModule,
    NzIconModule,
    NgIf,
    AsyncPipe,
    NzButtonModule,
    NzWaveModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
