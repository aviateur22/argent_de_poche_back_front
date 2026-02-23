import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateFamilyAccountDto, FamilyAccountDto, FamilyAccountResponseDto, LoadFamilyAccountDto } from '../models/family-account.dto';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../../misc/api-url';

@Injectable({
  providedIn: 'root',
})
export class FamilyAccountService {

  private _http = inject(HttpClient);

  /**
   * Chargement des données d'une famille
   *
   * @param loadFamilyAccountDto Les données du parent
   *
   * @returns Les données de la famille
   */
  loadFamilyAccount(loadFamilyAccountDto: LoadFamilyAccountDto): Observable<FamilyAccountDto> {
    const url = apiUrl.loadFamilyChildAccounts.url
    .replace('{parentId}', loadFamilyAccountDto.parentId);

    return this._http.get<FamilyAccountDto>(url);
  }

  /**
   * Création d'un compte famililale
   *
   * @param createFamilyDto Les données nécessaire à la création du compte
   *
   * @returns Les données du nouveaux compte créé
   */
  createFamilyAccount(createFamilyDto: CreateFamilyAccountDto): Observable<FamilyAccountResponseDto> {
    const url = apiUrl.createFamilyAccount.url;
    return this._http.post<FamilyAccountResponseDto>(url, createFamilyDto);
  }
}
