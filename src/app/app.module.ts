import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {UserComponent} from './pages/user/user.component';
import {OffersComponent} from './pages/offers/offers.component';
import {AppRoutingModule} from "./app-routing.module";
import { NewOfferDialogComponent } from './pages/offers/new-offer-dialog/new-offer-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UserComponent,
        OffersComponent,
        NewOfferDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
