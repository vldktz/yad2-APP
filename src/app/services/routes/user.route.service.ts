import { Injectable } from '@angular/core';
import {HttpSenderService} from "../http-sender.service";
import {Observable} from "rxjs";
import {IApiResponse, IUser, IUserLogin} from "../../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class UserRouteService {

    private baseUrl = '/users';

    constructor(private httpSenderService: HttpSenderService) { }

    public createNewUser(user: IUser):Observable<IApiResponse<any> | null> {
        return this.httpSenderService.sendHttpRequest(this.baseUrl, 'POST', user);
    }
    public loginUser(params: IUserLogin):Observable<IApiResponse<any> | null> {
        return this.httpSenderService.sendHttpRequest(`${this.baseUrl}/login`, 'POST', params);
    }
    public logoutUser():Observable<IApiResponse<any> | null> {
        return this.httpSenderService.sendHttpRequest(`${this.baseUrl}/logout`, 'POST', null);
    }
    public updateUser(id: number,user: IUser):Observable<IApiResponse<any> | null> {
        return this.httpSenderService.sendHttpRequest(`${this.baseUrl}/${id}`, 'PUT', user);
    }
}
