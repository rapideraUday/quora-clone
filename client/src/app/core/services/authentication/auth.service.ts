import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { EndpointService } from './../../config';
import { AppStorage } from './app-storage.service';
import { ExceptionService } from './../exception/exception.service';
import { map, catchError, finalize } from 'rxjs/operators';

interface ILoginRequest {
    email: string;
    password: string;
}

interface IResponse {
    success: boolean;
    result: any;
}



@Injectable()
export class AuthService {

    private LoggedInUserSubject = new Subject<any>();
    private loggedInUserState;

    currentUser: any;

    constructor(
        @Optional() @SkipSelf() prior: AuthService,
        private http: HttpClient,
        private endpointService: EndpointService,
        private exceptionService: ExceptionService,
        private appStorage: AppStorage,
        ) {

        if (prior) { return prior; }
    }



    isLoggedIn(): boolean {
        return this.appStorage.get('auth_token') != null;
    }

    /**
     * Login : tries to login user with the given request.
     * @param- request
     */
    login(request: ILoginRequest): Observable<any> {
        const url = this.endpointService.get('LOGIN').url;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(request);

        const response = this.http
            .post(`${url}`, body, { headers: headers })
            .pipe(map(res => {
                const resp = this.extractData(res);
                this.saveTokenOnSuccessLogin(resp);
                return resp;
            }))
            .pipe(catchError(this.exceptionService.catchBadResponse));

        return response;
    }

    /**
     * Logout: logs out user and deactivate the token on the server.
     */
    logout(): Observable<any> {
        const url = this.endpointService.get('LOGOUT').url;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.appStorage.get('auth_token')
        });

        const response = this.http
            .post(`${url}`, {}, { headers: headers })
            // .map(res => <IResponse>res.json().data)
            .pipe(map(res => <IResponse>res))
            .pipe(catchError(this.exceptionService.catchBadResponse))
            .pipe(finalize(() => this.clearTokenOnSuccessLogout()));

        return response;
    }

    /**
     * Logout: logs out user and deactivate the token on the server.
     */
    loggedInUser(): Observable<any> {
        if (this.currentUser) {
            return of(this.currentUser);
        }

        if (!this.loggedInUserState) {
            this.loggedInUserState = this.LoggedInUserSubject.asObservable();

            const url = this.endpointService.get('GET_LOGGEDINUSER').url;
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.appStorage.get('auth_token')
            });

            const response = this.http
                .get(`${url}`, { headers: headers })
                .pipe(map(res => res))
                .pipe(catchError(this.exceptionService.catchBadResponse));

            response.subscribe(resp => {
                this.currentUser = resp;
                this.LoggedInUserSubject.next(resp);
            });
        }

        return this.loggedInUserState;
    }



    private saveTokenOnSuccessLogin(response) {
        if (response) {
            const token = response.token;
            this.appStorage.save('auth_token', token);
        }
    }

    private clearTokenOnSuccessLogout() {

        // clear user data
        this.appStorage.clear();
        this.currentUser = null;

        // clear state and observables
        this.loggedInUserState = null;
    }

    private extractData(res) {

        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        const body = res.json ? res.json() : null;
        return body || {};
    }

}
