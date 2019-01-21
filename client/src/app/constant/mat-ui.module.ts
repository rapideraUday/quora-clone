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
    MatInputModule
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
        MatInputModule
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
        MatInputModule
    ]
})
export class MatUIModule {

}