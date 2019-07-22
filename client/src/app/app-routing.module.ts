import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitComponent } from './submit/submit.component';

const routes: Routes = [
  {
    path: 'submit',
    component: SubmitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
