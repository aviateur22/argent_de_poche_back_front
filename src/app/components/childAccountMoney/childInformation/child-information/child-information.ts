import { Component, inject, Input } from '@angular/core';
import { ChildMoneyAccount } from '../../../../store/model';
import { CapitalizePipe } from '../../../../pipe/capitalize-pipe';
import pageUrl from '../../../../../misc/page-url';
import { ChildImage } from '../child-image/child-image';
import { HelperInformation } from "../helper-information/helper-information";
import { Router } from '@angular/router';



@Component({
  selector: 'app-child-information',
  imports: [CapitalizePipe, ChildImage, HelperInformation],
  templateUrl: './child-information.html',
  styleUrl: './child-information.css',
})
export class ChildInformation  {

  private _router = inject(Router);

  @Input() childMoneyAccount!: ChildMoneyAccount;


  /**
   * Navaigation vers la page de paramétrage du compte d'argent de poche
   * On passe dans le context l'objet childMoneyAccount
   * Cela permettra la récupération des données sur la page de parametre
   */
  redirectToManageChild(): void {

    this._router.navigate([pageUrl.manageAccount.url], {
      state: {
        childMoneyAccount: this.childMoneyAccount
      }
    })
  }
}
