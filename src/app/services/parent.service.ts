import { inject, Injectable } from "@angular/core";
import { APP_CONSTANT } from "../../misc/app-constant";
import { Parent } from "../models/parent.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../store/state";
import * as actions from "../store/actions";
import pageUrl from "../../misc/page-url";

@Injectable({
  providedIn: 'root',
})
export class ParentService {

  private _router = inject(Router);
  private _store = inject(Store<ApplicationState>);

  public persistAuthentifiedParent(authenticatedParent: Parent, jwt: string) {
    this.setActiveParent(authenticatedParent);
    this.setParentJwt(jwt);
  }

  /**
   * Renvoie une instance du parent authentifié
   *
   *
   * @returns {Parent} Le parent authentifié ou null si pas de données
   *
   */
  public getAuthenticatedParent(): Parent | null {
    try {
      const parentFromStorage = localStorage.getItem(APP_CONSTANT.ACTIVE_PARENT);

      // Storage vide
      if(!parentFromStorage) {
        this.manageSessionExpired();
        return null;
      }

      const parent = JSON.parse(parentFromStorage) as Parent;

      // Date de validitée session expirée
      if(new Date(parent.sessionValidUntil).getTime() < Date.now()) {
        this.manageSessionExpired();
        return null;
      }

      return parent;

    } catch (error) {
      this.manageSessionExpired();
      return null;
    }
  }

  /**
   * Récupération de l'identifiant du parent
   * En cas d'absence de données, redirection vers la page de connexion
   */
  public getParentId(): string {
    const parentAuth = this.getAuthenticatedParent();

    if(parentAuth === null) {
      this._store.dispatch(actions.displayMessageAction({ message: {
        isError: true,
        title: '',
        message: 'Echec récupération récupération identification parent'
      } }));
      throw new Error('Impossible de récupérer l\'identifiant du prant');
    }
    return parentAuth.parentId;
  }


  /**
   * Renvoie le compte d'argent de poche actif
   *
   * @returns Le numero du comte ou Null
   */
  public getActiveChildAccountMoney(): string | null {
    const childAccountFromStorage = localStorage.getItem(APP_CONSTANT.ACTIVE_PARENT);

    if(!childAccountFromStorage)
      return null;

    return JSON.parse(childAccountFromStorage);
  }

  public logout() {
    localStorage.clear();
  }

  private setActiveChildAccount(childAccountId: string) {
    localStorage.setItem(APP_CONSTANT.ACTIVE_CHILD_ACCOUNT, JSON.stringify(childAccountId));
  }

  private setActiveParent(activeParent: Parent) {
    localStorage.setItem(APP_CONSTANT.ACTIVE_PARENT, JSON.stringify(activeParent));
  }

  private setParentJwt(jwt: string) {
    localStorage.setItem(APP_CONSTANT.HEADER_AUTHORIZATION_BEARER, JSON.stringify(jwt));
  }

  /**
   * Gestion des sessions expirée
   */
  private manageSessionExpired(): void {
    this.logout();
    this._store.dispatch(actions.displayMessageAction({message: {title: '', message: 'Votre session a expirée', isError: true}}));
    this._router.navigate([pageUrl.login.url]);
  }
}
