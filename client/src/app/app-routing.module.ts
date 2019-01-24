import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'sign-up',
    component: SignUpComponent,

  },
  {
    path: 'feed',
    component: FeedComponent,

  },
  {
    path: 'question',
    component: QuestionComponent,

  },
  
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
