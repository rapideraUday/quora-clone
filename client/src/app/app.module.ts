import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
// import { NgxCaptchaModule } from 'ngx-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './module/account/account.module';
// import { SignUpComponent } from './module/sign-up/sign-up.component';
// import { HomeComponent } from './home/home.component';
import { MatUIModule } from './constant/mat-ui.module';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { FeedComponent } from './feed/feed.component';
import { QuestionComponent } from './question/question.component';
import { DialogComponent } from './dialog/dialog.component';
// import { ToolbarComponent } from './toolbar/toolbar.component';
import { LeftsideComponent } from './leftside/leftside.component';
import { RightsideComponent } from './rightside/rightside.component';
import { EbookdialogComponent } from './ebookdialog/ebookdialog.component';
import { DownloadComponent } from './download/download.component';

import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { MaterialModule } from './core/shared/material/material.module';
import { SignUpComponent } from './module/account/sign-up/sign-up.component';
import { LoginComponent } from './module/account/login/login.component';
import { LoginFormComponent } from './module/account/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    LoginFormComponent,
    SignUpComponent,
    // HomeComponent,
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
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxCaptchaModule,
    AccountModule,
  ],
  providers: [],
  entryComponents:[DialogComponent,EbookdialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
