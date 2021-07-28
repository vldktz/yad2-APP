import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {IOfferType, IUser} from "../../../interfaces/app.interface";
import {OfferTypeRouteService} from "../../../services/routes/offer-type.route.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {OfferRouteService} from "../../../services/routes/offer.route.service";

@Component({
    selector: 'app-new-offer-dialog',
    templateUrl: './new-offer-dialog.component.html',
    styleUrls: ['./new-offer-dialog.component.scss']
})
export class NewOfferDialogComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    private user: IUser | undefined;
    public offerForm: FormGroup | undefined;
    public offerTypes: Array<IOfferType> | undefined;

    constructor(private userService: UserService,
                private snackBar: MatSnackBar,
                private offerRoute: OfferRouteService,
                private dialogRef: MatDialogRef<NewOfferDialogComponent>,
                private offerTypeRoute: OfferTypeRouteService) {
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
                this.getOfferTypes();
            }));
    }

    private getOfferTypes() {
        this.subscriptions.push(
            this.offerTypeRoute.getAllOfferTypes().subscribe((response) => {
                if (response?.data) {
                    this.offerTypes = response.data;
                    this.initForm();
                } else {
                    this.snackBar.open('No Offer Types are available', 'close', {
                        duration: 5000,
                        panelClass: ['red-snackbar']
                    });
                    this.dialogRef.close();
                }
            })
        );
    }

    private initForm() {
        this.offerForm = new FormGroup({
            userID: new FormControl(this.user?.id, [Validators.required]),
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            offerTypeID: new FormControl(undefined, [Validators.required]),
            phoneNumber: new FormControl('', [Validators.required,Validators.pattern(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/)]),
            email: new FormControl('', [Validators.required, Validators.email]),
        })
    }

    public submit() {
        if (this.offerForm?.valid) {
            this.subscriptions.push(
                this.offerRoute.createNewOffer(this.offerForm.getRawValue()).subscribe((response) => {
                    if (response?.data) {
                        this.snackBar.open('Offer published successfully', 'close', {
                            duration: 5000,
                            panelClass: ['green-snackbar']
                        });
                        this.dialogRef.close();
                    }
                })
            );

        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
