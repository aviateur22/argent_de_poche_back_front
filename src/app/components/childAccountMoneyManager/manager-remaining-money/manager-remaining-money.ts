import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ManagerComponentContainer } from '../manager-component-container/manager-component-container';
import { ChildMoneyAccount } from '../../../store/model';
import { ConfirmationService } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { ReinitializeRemainingMoneyDto } from '../../../models/child-money.dto';
import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selector';
import { startWith, switchMap, take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-manager-remaining-money',
  imports: [ManagerComponentContainer, CurrencyPipe, InputNumberModule , InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './manager-remaining-money.html',
  styleUrl: './manager-remaining-money.css',
})
export class ManagerRemainingMoney implements OnInit {
  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;
  private _confirmationService = inject(ConfirmationService);
  private _store = inject(Store);
  private _actions$ = inject(Actions);
  private _childMoneyAccount$ = this._store.pipe(select(selectors.childMoneyAccountSelector), startWith(null));

  ngOnInit(): void {
    /**
     * Abonement a l'action refreshChildAccountSuccessAction afin de mettre à jour
     * l'argent de poche restant lors de modification
     */
    this._actions$
    .pipe(ofType(actions.refreshChildAccountSuccessAction),
    take(1),
    switchMap(() => this._childMoneyAccount$)
    ).subscribe(childAccount => {
      this.childMoneyAccount.remainingMoney = childAccount!.remainingMoney
    })
  }

  /**
   * Réinitialisation de l'argent de poche restant
   */
  reinitializeRemainingMoney(): void {
    this._confirmationService.confirm({
      message: 'Réinitialiser l\'argent de poche restant?',
      acceptButtonProps: {
        label: 'Oui',
        severity: 'info'
      },
      rejectButtonProps:{
        label: 'Non',
        severity: 'danger',
        outlined: true
      },
      accept: () =>{
        const reinitializeRemainingMoneyDto: ReinitializeRemainingMoneyDto = {
          childAccountId: this.childMoneyAccount.childMoneyAccountId,
          parentId: this.parentId
        }

        this._store.dispatch(actions.reinitializeRemainingMoneyAction({ reinitializeRemainingMoneyDto }));
      }
    })
  }

}
