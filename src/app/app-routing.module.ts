import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {OffersComponent} from "./pages/offers/offers.component";
import {UserComponent} from "./pages/user/user.component";
import {ValidTokenService} from "./services/valid-user.service";


const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'new-user',component: UserComponent},
    {path: 'user',component: UserComponent, canActivate: [ValidTokenService]},
    {path: 'offers',component: OffersComponent ,canActivate: [ValidTokenService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
