import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitComponent } from './submit/submit.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { NarrativeComponent } from './narrative/narrative.component';
import { NarrativeIndexComponent } from './narrative/index/index.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
