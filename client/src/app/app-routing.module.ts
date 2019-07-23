import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitComponent } from './submit/submit.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
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
