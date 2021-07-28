import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserRouteService} from "../../services/routes/user.route.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ERRORS} from "../../utils/app.consts";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {UserComponent} from "../user/user.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public hide: boolean = true;
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    constructor(private userRoute: UserRouteService,
                private router: Router,
                private snackBar: MatSnackBar,
                private userService: UserService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.checkIfLoggedIn();
    }

    public login() {
        if (this.loginForm.valid) {
            this.subscriptions.push(
                this.userRoute.loginUser(this.loginForm.getRawValue()).subscribe((response) => {
                    if (response?.data) {
                        this.snackBar.open(`Hello ${response.data.fullName}`, 'close', {
                            duration: 5000,
                            panelClass: ['green-snackbar']
                        });
                        this.userService.setUser(response.data);
                        this.router.navigate(['offers']);
                    }
                })
            );
        }
    }

    private checkIfLoggedIn() {
        this.subscriptions.push(
            this.userService.getUser().subscribe((user) => {
                if (user) {
                    this.router.navigate(['offers']);
                }
            }));
    }

    public createNewUser() {
        this.dialog.open(UserComponent, {disableClose: true});
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
