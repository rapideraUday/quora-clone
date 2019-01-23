import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatStepperModule
} from '@angular/material';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        MatOptionModule,
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        MatStepperModule
    ],
    exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        MatOptionModule,
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        MatStepperModule
    ]
})
export class MatUIModule {

}