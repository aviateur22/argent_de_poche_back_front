import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMoneyMovementDto, ChildAccountDto, ChildAccountIdDto, ReinitializeRemainingMoneyDto, UpdatedChildNameDto, UpdatedIntialMoneyDto } from '../models/child-money.dto';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../../misc/api-url';

@Injectable({
  providedIn: 'root',
})
export class ChildMoneyAccountService {

  private _http = inject(HttpClient);

  /**
   * Chargement d'un compte d'argent de poche
   *
   * @param parentId L'identifiant du parent
   * @param childAccountId L'identifiant du compte d'argent de poche
   *
   * @returns Renvoie les données du compte
   */
  loadChildAccount(parentId: string, childAccountId: string): Observable<ChildAccountDto> {
    let url = apiUrl.loadChildAccount.url
    .replace('{parentId}', parentId)
    .replace('{childAccountId}', childAccountId);

    return this._http.get<ChildAccountDto>(url);
  }

  streamChildImage(imageName: string, parentId: string, childAccountId: string): Observable<Blob> {
    let url = apiUrl.streamChildImage.url
    .replace('{parentId}', parentId)
    .replace('{childAccountId}', childAccountId)
    .replace('{imageName}', imageName);

    return this._http.get(url) as Observable<Blob>;
  }

  /**
   * Ajout d'un mouvement d'argent
   *
   * @param addMovementMovement Les données sur le mouvement d'argent a ajouter
   *
   * @returns L'identifiant du compte d'argent de poche qui est mis a jour
   */
  addMoneyMovement(addMovementMovement: AddMoneyMovementDto ):Observable<ChildAccountIdDto> {
    const url = apiUrl.addMoneyMovement.url;

    return this._http.put<ChildAccountIdDto>(url, addMovementMovement)

  }

  /**
   * Mise a jour du nom d'un enfant
   *
   * @param { UpdatedChildNameDto } updatedChildNameDto Les données sur la mise a jour du nom de l'enfant
   *
   * @returns L'identifiant du compte d'argent de poche qui est mis a jour
   */
  updateChildName(updatedChildNameDto: UpdatedChildNameDto): Observable<ChildAccountIdDto> {
   const url = apiUrl.updateChildName.url;
   return this._http.put<ChildAccountIdDto>(url, updatedChildNameDto);
  }

  /**
   * Mise à jour de l'argent de poche disponible en début de période
   *
   * @param updateInitialMoneyDto Les données sur la mise a jour l'argent de poche
   *
   * @returns L'identifiant du compte d'argent de poche qui est mis a jour
   */
  updateIntialMoney(updateInitialMoneyDto: UpdatedIntialMoneyDto): Observable<ChildAccountIdDto> {
    const url = apiUrl.updateMoneyAtPeriodStart.url;
    return this._http.put<ChildAccountIdDto>(url, updateInitialMoneyDto);
  }

  /**
   * Reinitialisation de l'argent de poche restant
   *
   * @param reinitializeRemainingMoney Les données pour reiniitialiser l'argent de poche
   *
   * @returns L'identifiant du compte d'argent de poche qui est mis a jour
   */
  reinitializeRemainingMoney(reinitializeRemainingMoney: ReinitializeRemainingMoneyDto): Observable<ChildAccountIdDto> {
    const url = apiUrl.reinitializeRemainingMoney.url;
    return this._http.post<ChildAccountIdDto>(url, reinitializeRemainingMoney);
  }

}
