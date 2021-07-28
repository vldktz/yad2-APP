import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";
import {IApiResponse} from '../interfaces/app.interface';
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {ERRORS} from "../utils/app.consts";


@Injectable({
    providedIn: 'root'
})
export class HttpSenderService {

    constructor(private http: HttpClient,
                private router: Router,
                private snackBar: MatSnackBar
    ) {
    }

    /**
     * basic http send function
     * @param url
     * @param method
     * @param params
     * @return Observable<IApiResponse>
     */
    public sendHttpRequest<T>(url: string, method: string, params: any): Observable<IApiResponse<T> | null> {
        let headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
        url = environment.apiUrl + url;

        switch (method) {
            case 'GET': {
                return this.http.get<IApiResponse<T>>(url, {
                    headers,
                    withCredentials: true,
                    observe: 'response',
                    params: params
                }).pipe(
                    map(res => res.body),
                    catchError(this.handleError)
                );
            }
            case 'POST': {
                return this.http.post<IApiResponse<T>>(url, params, {headers, withCredentials: true, observe: 'response'}).pipe(
                    map(res => res.body),
                    catchError(this.handleError)
                );
            }
            case 'PUT': {
                return this.http.put<IApiResponse<T>>(url, params, {headers, withCredentials: true, observe: 'response'}).pipe(
                    map(res => res.body),
                    catchError(this.handleError)
                );
            } default:
                return of(null);
        }
    }

    /**
     * Http request error handler function
     * @param err
     */
    private handleError = (err: any) =>  {
        if (err.status === 403){
            this.router.navigate(['/']);
            return of(null);
        }
        const code = err.error?.statusCode || 500;
        // @ts-ignore
        this.snackBar.open(ERRORS[code], 'סגור', {
            duration: 5000,
            panelClass: ['red-snackbar']
        });
        return of(null);
    };

}
