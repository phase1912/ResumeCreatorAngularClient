import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCvComponent } from './create-cv/create-cv.component';
import { CreateCvRoutingModule } from "./create-cv-routing.module";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DefaultTemplateComponent } from './templates/default-template/default-template.component';
import { EducationComponent } from './create-cv/components/education.component/education.component';
import { SummaryComponent } from './create-cv/components/summary.component/summary.component';
import {
  ProfessionalSkillsComponent
} from './create-cv/components/professional-skills.component/professional-skills.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { TechnicalSkillsComponent } from './create-cv/components/technical-skills.component/technical-skills.component';
import { LanguageSkillComponent } from './create-cv/components/language-skill.component/language-skill.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { WorkExperienceComponent } from './create-cv/components/work-experience.component/work-experience.component';
import { ProgressComponent } from './create-cv/components/progress.component/progress.component';
import { SimpleTemplateComponent } from './templates/simple-template/simple-template.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    CreateCvComponent,
    DefaultTemplateComponent,
    EducationComponent,
    SummaryComponent,
    ProfessionalSkillsComponent,
    TechnicalSkillsComponent,
    LanguageSkillComponent,
    WorkExperienceComponent,
    ProgressComponent,
    SimpleTemplateComponent
  ],
    imports: [
        CommonModule,
        CreateCvRoutingModule,
        NzAvatarModule,
        NzCardModule,
        NzDescriptionsModule,
        NzDatePickerModule,
        NzInputModule,
        ReactiveFormsModule,
        FormsModule,
        NzIconModule,
        NzButtonModule,
        NzPopconfirmModule,
        NzProgressModule,
        NzRadioModule,
        NzDropDownModule,
        NzSelectModule,
        CoreModule
    ],
  exports: [
    CreateCvComponent,
    DefaultTemplateComponent,
    SimpleTemplateComponent
  ]
})
export class CreateCvModule { }
