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
    MatStepperModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule
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
        MatStepperModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule
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
        MatStepperModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule
    ]
})
export class MatUIModule {

}