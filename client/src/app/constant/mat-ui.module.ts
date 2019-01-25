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
    MatMenuModule,
    MatBadgeModule
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
        MatMenuModule,
        MatBadgeModule
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
        MatMenuModule,
        MatBadgeModule
    ]
})
export class MatUIModule {

}