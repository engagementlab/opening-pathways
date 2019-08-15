import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomePatientComponent } from './home-patient/home-patient.component';
import { SubmitComponent } from './submit/submit.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizLandingComponent } from './quiz/landing/landing.component';
import { NarrativeComponent } from './narrative/narrative.component';
import { NarrativeIndexComponent } from './narrative/index/index.component';

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
    component: QuizLandingComponent
  },
  {
    path: 'quiz/take',
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
