import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {IUser} from "../interfaces/app.interface";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private router: Router) {
    }
    private user: IUser | undefined;

    /**
     * set user to local storage
     * @param user
     */
    public setUser = (user:IUser) => {
        this.user = user;
        localStorage.setItem(`${environment.appName}_user`, JSON.stringify(user));
    }

    /**
     * remove user from local storage
     */
    public removeUser() {
        this.user = undefined;
        localStorage.removeItem(`${environment.appName}_user`);
        setTimeout(() => {
            this.router.navigate(['']);
        }, 1000)
    }

    /**
     * get user from local storage
     */
    public getUser(): Observable<IUser> {
        return new Observable((observer) => {
            if (this.user) {
                return observer.next(this.user);
            }
            if (localStorage.getItem(`${environment.appName}_user`)) {
                this.user = JSON.parse(<string>localStorage.getItem(`${environment.appName}_user`));
                return observer.next(this.user);
            }
            this.user = undefined;
            return observer.next(this.user);
        });
    }}
