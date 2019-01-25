import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MatUIModule } from './constant/mat-ui.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FeedComponent } from './feed/feed.component';
import { QuestionComponent } from './question/question.component';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LeftsideComponent } from './leftside/leftside.component';
import { RightsideComponent } from './rightside/rightside.component';
import { EbookdialogComponent } from './ebookdialog/ebookdialog.component';
import { DownloadComponent } from './download/download.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    SignUpComponent,
    HomeComponent,
    FeedComponent,
    QuestionComponent,
    DialogComponent,
    ToolbarComponent,
    LeftsideComponent,
    RightsideComponent,
    EbookdialogComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatUIModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule
  ],
  providers: [],
  entryComponents:[DialogComponent,EbookdialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
