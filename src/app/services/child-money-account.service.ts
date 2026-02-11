import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildAccountDto } from '../models/child-money.dto';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../../misc/api-url';

@Injectable({
  providedIn: 'root',
})
export class ChildMoneyAccountService {

  private _http = inject(HttpClient);

  loadChildAccount(parentId: string, childAccountId: string): Observable<ChildAccountDto> {
    let url = apiUrl.loadChildAccount.url
    .replace('{parentId}', parentId)
    .replace('{childAccountId}', childAccountId);

    return this._http.get<ChildAccountDto>(url);
  }

}
