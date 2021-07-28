import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserRouteService} from "../../services/routes/user.route.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserComponent} from "../user/user.component";
import {NewOfferDialogComponent} from "./new-offer-dialog/new-offer-dialog.component";

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    constructor(private userRoute: UserRouteService,
                private router: Router,
                private dialog: MatDialog,
                private userService: UserService) {
    }

    ngOnInit(): void {
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
