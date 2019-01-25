import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { QuestionComponent } from './question/question.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LeftsideComponent } from './leftside/leftside.component';
import { RightsideComponent } from './rightside/rightside.component';

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
    path: 'toolbar',
    component: ToolbarComponent,

  },
  {
    path: 'leftside',
    component: LeftsideComponent,

  },
  {
    path: 'rightside',
    component: RightsideComponent,

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
