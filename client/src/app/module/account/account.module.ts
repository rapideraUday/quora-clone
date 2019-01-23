import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from 'src/app/core/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        LoginComponent,
        LoginFormComponent,
        SignUpComponent
    ],

    imports:[
        BrowserModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],

    exports:[
        LoginComponent,
        LoginFormComponent,
        SignUpComponent
    ]
})
export class AccountModule{

}