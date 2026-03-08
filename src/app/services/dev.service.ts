import { inject, Injectable } from "@angular/core";
import { ParentService } from "./parent.service";
import { Parent } from "../models/parent.model";


@Injectable({
  providedIn: 'root'
})
/**
 * Service permettant d'inject un parent fictif lors dquand le mode dev activé
 * Ce service est appelé automatiquement au démarrage d'un projet Anagular
 */
export class DevService {

  private _parenService = inject(ParentService);

  public loadFictiveParent() {
    const dateNow = Date.now();
    const dateIn10Day = new Date(dateNow);
    dateIn10Day.setDate(dateIn10Day.getDate() + 10);

    const fictiveParent: Parent = {
      parentId: '1',
      roles: [],
      parentName: '',
      familyName: '',
      sessionValidUntil: dateIn10Day
    }

    this._parenService.persistAuthentifiedParent(fictiveParent, 'fictiveJwt');

  }

}
