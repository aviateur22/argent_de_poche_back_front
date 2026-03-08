import { Component, inject } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { CreateChildName } from "../create-child-name/create-child-name";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import * as actions from "../../../store/actions";
import { CreateChildAccountDto } from '../../../models/child-money.dto';
import { ParentService } from '../../../services/parent.service';
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';

@Component({
  selector: 'app-create-child-account-page',
  imports: [MainContainer, CreateChildName, InputNumberModule , InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './create-child-account-page.html',
  styleUrl: './create-child-account-page.css'
})
export class CreateChildAccountPage {
  private _store = inject(Store);
  private _parentService = inject(ParentService);
  private _router = inject(Router);


  /**
   * Le nom de l'enfant
   */
  childName: string | null = null;

  /**
   * Création d'un compte
   */
  createChildAccount() {
    const parentId = this._parentService.getParentId();

    if(!this.childName)
      return;

    const createChildAccountDto: CreateChildAccountDto = {
      childName: this.childName,
      parentId

    }

    this._store.dispatch(actions.createChildAccountAction({ createChildAccountDto }))
  }

  /**
   * Redirection au compte de famille
   */
  redirectToFamilyAccount() {
    this._router.navigate([pageUrl.familyAccount.url]);
  }

}
