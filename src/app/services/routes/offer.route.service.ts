import {Injectable} from '@angular/core';
import {HttpSenderService} from "../http-sender.service";
import {Observable} from "rxjs";
import {IApiResponse, IOffer, IOfferSearch} from "../../interfaces/app.interface";

@Injectable({
    providedIn: 'root'
})
export class OfferRouteService {

    private baseUrl = '/offer';

    constructor(private httpSenderService: HttpSenderService) { }

    public createNewOffer(offer: IOffer): Observable<IApiResponse<any> | null> {
        return this.httpSenderService.sendHttpRequest(this.baseUrl, 'POST', offer);
    }

    public getAllOffers(params: IOfferSearch): Observable<IApiResponse<any> | null> {
        return this.httpSenderService.sendHttpRequest(this.baseUrl, 'GET', params);
    }
}
