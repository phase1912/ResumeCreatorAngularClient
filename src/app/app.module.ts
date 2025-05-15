import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { provideEffects } from '@ngrx/effects';
import { appStateReducer } from './state/app.reducers';
import { provideStore } from '@ngrx/store';
// @ts-ignore
import * as appEffects from './state/app.effects';
import { metaReducers } from './state/app.meteRedusers';
import { CoreModule } from './core/core.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    CoreModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideStore({ appState: appStateReducer }, { metaReducers }),
    provideEffects(appEffects),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
