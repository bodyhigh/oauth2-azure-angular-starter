import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../shared/api-base.service';

export interface UserProfileModel
{
  id: string,
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  roles?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService {
  private urlBase: string = "https://localhost:7269/api" + "/user";
  // private urlBase: string = "http://localhost:5059/api";

  // constructor(httpClient: HttpClient) {
  //   super(httpClient)
  // }

  getUserProfile<T>(id: string): Observable<T> {
    const url = `${this.urlBase}/${id}/profile`;
    return this.get<T>(url);
  }
  // getProfile(userid: string): Observable<any> {
  //   let header = new HttpHeaders().set("Access-Control-Allow-Origin", "*");
  //   return this.httpClient.get(`${this.urlBase}/user/${userid}/profile`, {headers: header});
  // }
}
