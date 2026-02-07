import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildAccountDto } from '../models/child-money.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import apiUrl from '../../misc/api-url';

@Injectable({
  providedIn: 'root',
})
export class ChildMoneyService {

  private _http = inject(HttpClient);

  loadChildAccount(parentId: string, childAccountId: string): Observable<ChildAccountDto> {
    const params = new HttpParams()
      .set('childAccountId', childAccountId)
      .set('parentId', parentId);

    return this._http.get<ChildAccountDto>(apiUrl.loadChildAccount.url, { params });
  }

}
