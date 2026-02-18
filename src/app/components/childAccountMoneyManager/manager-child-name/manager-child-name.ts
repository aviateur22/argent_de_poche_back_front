import { Component, inject, Input, OnInit } from '@angular/core';
import { ManagerComponentContainer } from "../manager-component-container/manager-component-container";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { UpdatedChildNameDto } from '../../../models/child-money.dto';
import { Store } from '@ngrx/store';
import { ChildMoneyAccount } from '../../../store/model';
import * as actions from '../../../store/actions';

@Component({
  selector: 'app-manager-child-name',
  imports: [ManagerComponentContainer, InputNumberModule , InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './manager-child-name.html',
  styleUrl: './manager-child-name.css',
})
export class ManagerChildName implements OnInit {

  private _confirmationService = inject(ConfirmationService);
  private _store = inject(Store);

  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;

  /**
   * Les modifications sur le nom de l'enfant
   */
  newChildName!: string;

  ngOnInit(): void {
    this.newChildName = this.childMoneyAccount.childName;
  }

  /**
  * Mise a jour du prénom
  */
  updateChildName(): void {
    this._confirmationService.confirm({
      message: 'Modifier le prénom de l\'enfant ?',
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
        const updateChildNameDto: UpdatedChildNameDto = {
          childAccountId: this.childMoneyAccount.childMoneyAccountId,
          parentId: this.parentId,
          updateChildName : this.newChildName
        }

        this._store.dispatch(actions.updateChildNameAction({ updatedChildNameDto: updateChildNameDto }));
      }
    });
  }
}
