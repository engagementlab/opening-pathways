import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitComponent } from './submit/submit.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { NarrativeComponent } from './narrative/narrative.component';
import { NarrativeIndexComponent } from './narrative/index/index.component';
import { HomePatientComponent } from './home-patient/home-patient.component';

import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'narratives',
    component: NarrativeIndexComponent
  },
  {
    path: 'narratives/:id',
    component: NarrativeComponent
  },
  {
    path: 'submit',
    component: SubmitComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  }
];

const routesPatient: Routes = [
  {
    path: '',
    component: HomePatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(environment.partner ? routes : routesPatient)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
