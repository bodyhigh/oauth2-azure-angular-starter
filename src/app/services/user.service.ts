import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = "https://localhost:7269/api";
  // private urlBase: string = "http://localhost:5059/api";

  constructor(private httpClient: HttpClient) { }

  getProfile(userid: string): Observable<any> {
    let header = new HttpHeaders().set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get(`${this.urlBase}/user/${userid}/profile`, {headers: header});
  }
}
