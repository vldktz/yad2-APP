import {Injectable} from '@angular/core';
import {HttpSenderService} from "../http-sender.service";
import {Observable} from "rxjs";
import {IApiResponse} from "../../interfaces/app.interface";

@Injectable({
    providedIn: 'root'
})
export class OfferTypeRouteService {

    private baseUrl = '/offerTypes';

    constructor(private httpSenderService: HttpSenderService) { }

    public getAllOfferTypes():Observable<IApiResponse<Array<any>> | null> {
        return this.httpSenderService.sendHttpRequest(this.baseUrl, 'GET', null);
    }

}
