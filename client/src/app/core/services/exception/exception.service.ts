import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppStorage } from './../authentication/app-storage.service';

/**
 * @"class" ExceptionService
 * @description Handles all types of exceptions in the application.
 */
@Injectable()
export class ExceptionService {

  constructor(
    // private snackBar: MdSnackBar,
    private router: Router,
    private appStorage: AppStorage) { }

  /**
   * @method log
   * @param- error
   * @description logs the error to the console.
   */
  log(error: string): void {
    console.log(error);
  }

  /**
   * @method catchBadResponse
   * @param- error
   * @description logs the error to the console.
   */
  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = errorResponse;
    const err = res;
    const emsg = err ?
      (err.result ? err.result.message : JSON.stringify(err)) :
      (res.statusText || 'unknown error');

    // this.snackBar.open(`Error - ${emsg}`, '', {
    //   duration: 10000
    // });
    this.handleStatusCode(res.status);
    // this.toastService.activate(`Error - Bad Response - ${emsg}`);
   return Observable.throw(err); // TODO: We should NOT swallow error here.
   // return Observable.of(null);
  }

  private handleStatusCode(statusCode: number): void {

    switch (statusCode) {
      case 401:
        // const url = `/${route.path}`;
        this.appStorage.clear();
        this.router.navigate(['/login']);
        break;
    }

  }
}
