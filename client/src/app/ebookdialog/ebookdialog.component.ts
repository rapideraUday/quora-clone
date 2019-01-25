import { Component,Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-ebookdialog',
  templateUrl: './ebookdialog.component.html',
  styleUrls: ['./ebookdialog.component.scss']
})
export class EbookdialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EbookdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
