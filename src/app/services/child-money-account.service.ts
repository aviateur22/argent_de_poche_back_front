import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMoneyMovementDto, ChildAccountDto, ChildAccountIdDto, CreateChildAccountDto, CreatedChildAccountIdDto, DesactivateChildAccountDto, DisplayChildAccountInfoDto, ReinitializeRemainingMoneyDto, StreamChildAccountImageDto, UpdatedChildNameDto, UpdatedIntialMoneyDto } from '../models/child-money.dto';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../../misc/api-url';

@Injectable({
  providedIn: 'root',
})
export class ChildMoneyAccountService {

  private _http = inject(HttpClient);

  /**
   * Création d'un compte pour enfant
   *
   * @param createChildAccountDto Les données pour créer un compte d'argent de poche
   */
  createChildMoneyAccount(createChildAccountDto: CreateChildAccountDto): Observable<CreatedChildAccountIdDto> {
    let url = apiUrl.createChildAccount.url;

    return this._http.post<CreatedChildAccountIdDto>(url, createChildAccountDto);
  }

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

  /**
   * Stream de l'image d'un compte d'argent de poche
   *
   * @param imageName
   * @param parentId
   * @param childAccountId
   * @returns
   */
  streamChildImage(dto: StreamChildAccountImageDto): Observable<Blob> {
    let url = apiUrl.streamChildImage.url
    .replace('{parentId}', dto.parentId)
    .replace('{childAccountId}', dto.childAccountId)
    .replace('{imageName}', dto.imageName);

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

  /**
   * Modificaton de l'image du compte
   *
   * @param updateChildImageDto Les données contenant la nouvelle image du compte
   *
   * @returns L'identifiant du compte d'argent de poche qui est mis a jour
   */
  updateChildImage(updateChildImageDto: FormData): Observable<ChildAccountIdDto> {
    const url = apiUrl.updateChildAccountImage.url;
    return this._http.put<ChildAccountIdDto>(url, updateChildImageDto);
  }

    /**
   * Désactivation d'un compte
   *
   * @param {DesactivateChildAccountDto} dto Les données sur le compte a désactiver
   *
   * @returns L'identifiant du compte d'argent de poche qui est mis a jour
   */
  desactivateChildAccount(dto: DesactivateChildAccountDto): Observable<ChildAccountIdDto> {
        let url = apiUrl.desactivateChildAccount.url
    .replace('{parentId}', dto.parentId)
    .replace('{childAccountId}', dto.childAccountId);
    return this._http.delete<ChildAccountIdDto>(url);
  }

  /**
   * Stream une image d'un QR code avec l'url d'accés du compte de l'enfant
   *
   * @param parentId  L'identifiant du parant
   * @param childAccountId L'identifiant du compte
   */
  streamQrCodeOfChildAccount(parentId: string, childAccountId: string):Observable<Blob> {
    var url = apiUrl.streamQrCodeOfChildAccount.url
    .replace('{childAccountId}', childAccountId)
    .replace('{parentId}', parentId);

    return this._http.get(url) as Observable<Blob>;
  }

  /**
   * Récupération des infos d'un compte d'argent poche accessible sans authentification.
   *
   * @param childAccountId  L'identifiant du compte
   *
   * @returns Les données du compte
   */
  displayChildAccountInfo(childAccountId: string): Observable<DisplayChildAccountInfoDto> {
    let url = apiUrl.displayChildAccountInfo.url.replace('{childAccountId}', childAccountId);
    return this._http.get<DisplayChildAccountInfoDto>(url);
  }

}
