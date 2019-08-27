import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomePatientComponent } from './home-patient/home-patient.component';

import { QuizComponent } from './quiz/quiz.component';
import { QuizLandingComponent } from './quiz/landing/landing.component';

import { NarrativeComponent } from './narrative/narrative.component';
import { NarrativeIndexComponent } from './narrative/index/index.component';

import { PathwayComponent } from './pathways/pathway/pathway.component';
import { PathwayStoryComponent } from './pathways/pathway/story/story.component';

import { ResourcesComponent } from './resources/resources.component';

import { SubmitComponent } from './submit/submit.component';
import { SubmitPatientComponent } from './submit-patient/submit-patient.component';

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
    path: 'resources',
    component: ResourcesComponent
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
    component: HomePatientComponent,
    data: { bleed: true }
  },
  {
    path: 'pathway/:id',
    component: PathwayComponent
  },
  {
    path: 'pathway/:pid/story/:id',
    component: PathwayStoryComponent
  },
  {
    path: 'submit',
    component: SubmitPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(environment.partner ? routes : routesPatient)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
