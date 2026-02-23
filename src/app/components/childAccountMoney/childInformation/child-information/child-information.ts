import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';;
import { ActivatedRoute, Router } from '@angular/router';
import { ChildMoneyAccount } from '../../../../store/model';
import { CapitalizePipe } from '../../../../pipe/capitalize-pipe';
import pageUrl from '../../../../../misc/page-url';
import { ChildImage } from '../child-image/child-image';
import { ParentService } from '../../../../services/parent.service';
import apiUrl from '../../../../../misc/api-url';


@Component({
  selector: 'app-child-information',
  imports: [CapitalizePipe, ChildImage],
  templateUrl: './child-information.html',
  styleUrl: './child-information.css',
})
export class ChildInformation implements OnChanges {

  private _router = inject(Router);
  private _activateRoute = inject(ActivatedRoute);
  private _parentService = inject(ParentService);

  @Input() childMoneyAccount!: ChildMoneyAccount;

  /**
   * L'URL de l'image du compte d'argent de poche
   */
  childImageUrl!: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChildImageUrl();
  }

  /**
   * Chargement de l'url de l'image du compte
   */
  loadChildImageUrl(): void {
    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');
    const parentId = this._parentService.getParentId();

    // Récupération de l'url d'accés a l'image
    this.childImageUrl = apiUrl.streamChildImage.url
      .replace('{parentId}', parentId)
      .replace('{childAccountId}', childAccountId!)
      .replace('{imageName}', this.childMoneyAccount.childImageName);
  }

  /**
   * Navaigation vers la page de paramétrage du compte d'argent de poche
   * On passe dans le context l'objet childMoneyAccount
   * Cela permettra la récupération des données sur la page de parametre
   */
  redirectToManageChild(): void {

    this._router.navigate([pageUrl.manageAccount.url], {
      state: {
        childMoneyAccount: this.childMoneyAccount,
        childImageurl: this.childImageUrl
      }
    })
  }
}
