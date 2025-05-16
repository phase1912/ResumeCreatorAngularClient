import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCvComponent } from "./create-cv/create-cv.component";

const routes: Routes = [
  { path: '', component: CreateCvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCvRoutingModule { }
