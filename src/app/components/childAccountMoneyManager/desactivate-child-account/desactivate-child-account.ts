import { Component, inject, Input } from '@angular/core';
import { ManagerComponentContainer } from "../manager-component-container/manager-component-container";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChildMoneyAccount } from '../../../store/model';
import { ConfirmationService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { DesactivateChildAccountDto } from '../../../models/child-money.dto';
import * as actions from '../../../store/actions';


@Component({
  selector: 'app-desactivate-child-account',
  imports: [ManagerComponentContainer, InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './desactivate-child-account.html',
  styleUrl: './desactivate-child-account.css',
})
export class DesactivateChildAccount {
  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;

  private _confirmationService = inject(ConfirmationService);
  private _store = inject(Store);

  /**
   * Le nom de l'enfant qui est renseigné dans l'input
   * et qui permets d'activer le bouton de désactivation
   */
  confirmChildName: string = '';

  /**
   * Désactivation du compte
   */
  desactivateAccount() {
    this._confirmationService.confirm({
          message: `Voulez-vous vraiment désactiver le compte de ${this.childMoneyAccount.childName} ?`,
          acceptButtonProps: {
            label: 'Désactiver',
            severity: 'danger'
          },
          rejectButtonProps:{
            label: 'Non',
            severity: 'info',
            outlined: true
          },
          accept: () =>{
            const desactivateChildAccount: DesactivateChildAccountDto = {
              childAccountId: this.childMoneyAccount.childMoneyAccountId,
              parentId: this.parentId
            }

            this._store.dispatch(actions.desactivateChildAccountAction({ dto: desactivateChildAccount }));
          }
        });
  }

}
