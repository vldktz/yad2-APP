import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRouteService} from "../../services/routes/user.route.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {IUser} from "../../interfaces/app.interface";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public hide1: boolean = true;
    public hide2: boolean = true;
    private subscriptions: Subscription[] = [];
    public user: IUser | undefined;
    public userForm: FormGroup | undefined;

    constructor(private userRoute: UserRouteService,
                private snackBar: MatSnackBar,
                private router: Router,
                private userService: UserService,
                private dialogRef: MatDialogRef<UserComponent>) {
    }

    ngOnInit(): void {
        this.getUser();
    }

    private getUser() {
        this.subscriptions.push(
            this.userService.getUser().subscribe((user) => {
                if (user) {
                    this.user = user;
                }
                this.initForm();
            }));
    }

    private initForm(){
        this.userForm = new FormGroup({
            id: new FormControl(this.user?.id),
            email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
            fullName: new FormControl(this.user?.fullName, [Validators.required]),
            password: new FormControl('', this.getPasswordValidators()),
            passwordRepeat: new FormControl('',this.getPasswordValidators()),
        })
    }

    private getPasswordValidators(){
        return this.user? [] : [Validators.required, Validators.minLength(6)];
    }

    public submit() {
        if (this.userForm?.valid && this.testPasswords()) {
            const params = {...this.userForm.getRawValue()};
            delete params.passwordRepeat;
            if(this.user){
                this.subscriptions.push(
                    this.userRoute.updateUser(params.id,params).subscribe((response) => {
                        if (response && response.data) {
                            this.snackBar.open('Info updated', 'close', {
                                duration: 5000,
                                panelClass: ['green-snackbar']
                            });
                            this.userService.setUser(response.data);
                            this.dialogRef.close();
                        }
                    })
                );
            } else {
                this.subscriptions.push(
                    this.userRoute.createNewUser(params).subscribe((response) => {
                        if (response && response.data) {
                            this.snackBar.open(`Welcome ${response.data.fullName}`, 'close', {
                                duration: 5000,
                                panelClass: ['green-snackbar']
                            });
                            this.userService.setUser(response.data);
                            this.dialogRef.close();
                            this.router.navigate(['offers']);
                        }
                    })
                );
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public testPasswords() {
        return this.userForm?.get('password')?.value === this.userForm?.get('passwordRepeat')?.value;
    }

}
