import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreviewComponent } from './components/preview.component';

const routes: Routes = [
  { path: '', component: PreviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewRoutingModule { }
