import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

class Observer {
  next: Function;
  error: Function;
  complete: Function;
}

export class SingleResponse {
  public status: number;
  public IsSuccess: boolean;
  public details: string;
  }

export class Responses {
  public errors: SingleResponse[] = [];
  public success: SingleResponse[] = [];
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // https://medium.com/coding-in-depth/how-to-create-custom-httpclient-base-service-class-in-angular-80cc4f69faba
  ////////////////////////////////////////////////////////////////////////////////////

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  genericError = "";
  constructor(public http: HttpClient) {
  this.genericError = `Some Error occcured, Please contact Administrator for the Errors`;
  }

  get<T>(url: string): Observable<T> {

    let response = this.http
      .get<Responses & T>(url);

    return Observable.create((observer: Observer) => {
      response.subscribe(response => {
        if (response.errors && response.errors.length > 0) {
          // console.error(response.errors);
          observer.error(response.errors);
        } else {
          observer.next(response);
        }
        observer.complete();
      }, error => {
        observer.error([{ title: error.name, detail: this.genericError, error }]);
      });
    });

  }


  post(url: string, body: object): Observable<Responses[]> {

    let response = this.http
      .post<Responses>(url, body);

    return Observable.create((observer: Observer) => {
      response.subscribe(res => {
        if (res.errors.length > 0)
          observer.error(res.errors);
        else
          observer.next(res.success);
        observer.complete();
      }, error => {
        observer.error([{ title: error.name, detail: this.genericError, error }]);
      });
    });

  }

  delete(url: string): Observable<Responses[]> {

    let response = this.http
      .delete<Responses>(url);

    return Observable.create((observer: Observer) => {
      response.subscribe(res => {
        if (res.errors.length > 0)
          observer.error(res.errors);
        else
          observer.next(res.success);
        observer.complete();
      }, error => {
        observer.error([{ title: error.name, detail: this.genericError, error }]);
      });
    });

  }

}
