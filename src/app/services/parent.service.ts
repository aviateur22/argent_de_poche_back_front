import { inject, Injectable } from "@angular/core";
import { APP_CONSTANT } from "../../misc/app-constant";
import { Parent } from "../models/parent.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../store/state";
import * as actions from "../store/actions";
import pageUrl from "../../misc/page-url";
import { initialState } from "../store/reducer";

@Injectable({
  providedIn: 'root',
})
export class ParentService {

  private _router = inject(Router);
  private _store = inject(Store<ApplicationState>);

  /**
   * Persistance des données du parent connecté
   *
   * @param authenticatedParent  Le parent qui est connecté
   * @param jwt Le jwt permattnt d'authantifier le parent
   */
  public persistAuthentifiedParent(authenticatedParent: Parent, jwt: string) {
    this.setActiveParent(authenticatedParent, jwt);
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

  public logout() {
    localStorage.clear();
    this._store.dispatch(actions.logoutAction())
  }

  /**
   * Renvoie une instance du parent authentifié
   *
   *
   * @returns {Parent} Le parent authentifié ou null si pas de données
   *
   */
  private getAuthenticatedParent(): Parent | null {
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


  private setActiveParent(activeParent: Parent, jwt: string) {
    console.log(activeParent);
    localStorage.setItem(APP_CONSTANT.ACTIVE_PARENT, JSON.stringify(activeParent));
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
