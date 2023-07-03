import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../shared/api-base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService {
  private urlBase: string = `${environment.apiUrlRoot}/user`

  getUserProfile<T>(id: string): Observable<T> {
    const url = `${this.urlBase}/${id}/profile`;
    return this.get<T>(url);
  }

}
