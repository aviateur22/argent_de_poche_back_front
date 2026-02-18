import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { ChildMoneyAccount } from '../../../store/model';
import { UpdatedIntialMoneyDto } from '../../../models/child-money.dto';
import * as actions from '../../../store/actions';
import { ManagerComponentContainer } from "../manager-component-container/manager-component-container";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-manager-initial-money',
  imports: [ManagerComponentContainer, InputNumberModule , InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './manager-initial-money.html',
  styleUrl: './manager-initial-money.css',
})
export class ManagerInitialMoney implements OnInit {
  private _confirmationService = inject(ConfirmationService);
  private _store = inject(Store);

  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;

  /**
   * Mise à jour de l'argent de poche
  */
 newMoneyAtPeriodStart!: number;

 ngOnInit(): void {
   this.newMoneyAtPeriodStart = this.childMoneyAccount.moneyAtPeriodStart;
 }

 /**
  * Mise a jour de l'argent de poche initial
  */
  updateInitialMoney(): void {
    this._confirmationService.confirm({
      message: 'Modifier l\'argent de poche ?',
      acceptButtonProps: {
        label: 'Modifier',
        severity: 'info'
      },
      rejectButtonProps:{
        label: 'Non',
        severity: 'danger',
        outlined: true
      },
      accept: () =>{
        const updateInitialMoneyDto: UpdatedIntialMoneyDto = {
          childAccountId: this.childMoneyAccount.childMoneyAccountId,
          parentId: this.parentId,
          updatedMoneyAtPeriodStart : this.newMoneyAtPeriodStart
        }

        this._store.dispatch(actions.updateInitialStartMoneyAction({ updatedIntialMoneyDto: updateInitialMoneyDto }));
      }
    });
  }

}
