import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ParentService } from '../../../services/parent.service';
import { LoadFamilyAccountDto } from '../../../models/family-account.dto';
import * as actions from "../../../store/actions";
import { FamilyWrapper } from "../family-wrapper/family-wrapper";
import { FamilyDetail } from "../family-detail/family-detail";
import { FamilyChildAccount } from "../family-child-account/family-child-account";
import { MainContainer } from "../../share/main-container/main-container";

@Component({
  selector: 'app-family-account-page',
  imports: [FamilyWrapper, FamilyDetail, FamilyChildAccount, MainContainer],
  templateUrl: './family-account-page.html',
  styleUrl: './family-account-page.css',
})
export class FamilyAccountPage implements OnInit {

  private _store = inject(Store);
  private _parentService = inject(ParentService);

  /**
   * L'identifiant du parent
   */
  parentId!: string;

  /**
   * L'url d'acces a l'image du compte d'argent de poche
   * qui sera transféré au composant enfant pour affichage de
   * l'image du compte
   */
  childImageUrl!: string;

  ngOnInit(): void {
    this.loadFamilyAccount();
  }

  /**
   * Chargement des donnes de ma famille
   */
  loadFamilyAccount(): void {
    this.parentId = this._parentService.getParentId();

    const loadFamilyAccountDto: LoadFamilyAccountDto = {
      parentId: this.parentId
    }

    this._store.dispatch(actions.loadFamilyAccountAction({ loadFamilyAccountDto: loadFamilyAccountDto }));
  }
}
