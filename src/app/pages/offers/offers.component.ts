import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserRouteService} from "../../services/routes/user.route.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserComponent} from "../user/user.component";
import {NewOfferDialogComponent} from "./new-offer-dialog/new-offer-dialog.component";
import {OfferTypeRouteService} from "../../services/routes/offer-type.route.service";
import {IOffer, IOfferType} from "../../interfaces/app.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OfferRouteService} from "../../services/routes/offer.route.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    public offerTypes: Array<IOfferType> | undefined;
    public searchForm: FormGroup = new FormGroup({
        offerTypeID: new FormControl('')
    });
    public offers: Array<IOffer> | undefined;
    public displayedColumns : any[] = ['Title','Description','OfferTypeName','UserName','PhoneNumber','Email'];
    public displayState = 'GRID';



    constructor(private userRoute: UserRouteService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar,
                private offerTypeRoute: OfferTypeRouteService,
                private offerRoute: OfferRouteService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.getOfferTypes();
    }

    public getOffers(){
        const params = this.searchForm.getRawValue();
        if(params.offerTypeID == null)
            delete params.offerTypeID;
        this.subscriptions.push(
            this.offerRoute.getAllOffers(params).subscribe((response) => {
                this.offers = (response?.data)? response.data : [];
            })
        );
    }

    private getOfferTypes() {
        this.subscriptions.push(
            this.offerTypeRoute.getAllOfferTypes().subscribe((response) => {
                if (response?.data) {
                    this.offerTypes = response.data;
                } else {
                    this.snackBar.open('No Offer Types are available', 'close', {
                        duration: 5000,
                        panelClass: ['red-snackbar']
                    });
                }
            })
        );
    }


    public logout() {
        this.subscriptions.push(
            this.userRoute.logoutUser().subscribe((data) => {
                if (data) {
                    this.userService.removeUser();
                    this.router.navigate(['']);
                }
            })
        );
    }

    public editUser() {
        this.dialog.open(UserComponent,{ disableClose: true });
    }

    public newOffer(){
        this.dialog.open(NewOfferDialogComponent,{disableClose: true});
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
