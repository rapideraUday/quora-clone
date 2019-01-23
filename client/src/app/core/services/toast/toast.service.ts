import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn:'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public activate(errorText: string): void {
    console.log(errorText);
    
    this.zone.run(() => {
      const snackBar = this.snackBar.open(errorText, 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      })
    });
  }
}