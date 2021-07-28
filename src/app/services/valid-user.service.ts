import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class ValidTokenService implements CanActivate {

    constructor(private router: Router,
                private userService: UserService) {
    }


    /**
     * can activate guard for restricting access to only logged in users
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((subscriber) => {
            this.userService.getUser().subscribe((user) => {
                if (user) {
                    subscriber.next(true)
                } else {
                    this.router.navigate(['']);
                    subscriber.next(false)
                }
            });
        })

    }
}

