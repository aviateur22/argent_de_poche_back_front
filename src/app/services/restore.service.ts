import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ParentService } from "./parent.service";
import * as action from "../store/actions";

/**
 * Ce service est applé a chaque rechargement de page.
 * Il recharge le state parent du store ngrx
 */
@Injectable({ providedIn: 'root' })
export class RestoreService {

  private _store = inject(Store);
  private _parentService = inject(ParentService);

  /**
   * Refresh du state parent a chaque rchargement de page
   */
  refresh(): void {
    const authorizeRedirect = false;
    const parent = this._parentService.getAuthenticatedParent(authorizeRedirect);

    if (!parent)
      return;

    this._store.dispatch(action.refreshParentAction({ parentName: parent.parentName, familyName: parent.familyName  }));
  }
}
