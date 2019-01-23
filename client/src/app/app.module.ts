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

import { ExceptionService } from './core/services/exception/exception.service';
import { AppStorage } from './core/services/authentication/app-storage.service';
import { EndpointService } from './core/config';
import { LoadingService } from './core/services/loading/loading.service';
import { ApiService } from './core/services/api/api.service';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxCaptchaModule,
    AccountModule,
  ],
  providers: [ApiService,ExceptionService, AppStorage,EndpointService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
