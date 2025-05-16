import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { createCvFeature } from './pages/create-cv/state/create-cv.state';
import * as createCvEffects from './pages/create-cv/state/create-cv.effects';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/templates' },
  { path: 'templates', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    providers: [provideState(createCvFeature), provideEffects(createCvEffects)],
  },
  {
    path: 'create-cv', loadChildren: () => import('./pages/create-cv/create-cv.module').then(m => m.CreateCvModule),
    providers: [provideState(createCvFeature), provideEffects(createCvEffects)],
  },
  {
    path: 'preview', loadChildren: () => import('./pages/preview/preview.module').then(m => m.PreviewModule),
    providers: [provideState(createCvFeature), provideEffects(createCvEffects)],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
