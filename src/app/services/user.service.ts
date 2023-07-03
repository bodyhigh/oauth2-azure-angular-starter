import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../shared/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService {
  private urlBase: string = "https://localhost:7269/api" + "/user";

  getUserProfile<T>(id: string): Observable<T> {
    const url = `${this.urlBase}/${id}/profile`;
    return this.get<T>(url);
  }

}
