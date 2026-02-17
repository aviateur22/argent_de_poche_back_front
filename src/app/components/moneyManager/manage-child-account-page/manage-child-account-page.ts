import { Component, inject, OnInit } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { MainContainer } from "../../share/main-container/main-container";
import { InputNumberModule  } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selector';
import { ReinitializeRemainingMoneyDto, UpdatedChildNameDto, UpdatedIntialMoneyDto } from '../../../models/child-money.dto';
import { ParentService } from '../../../services/parent.service';
import { select, Store } from '@ngrx/store';
import { startWith, switchMap, take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';


@Component({
  selector: 'app-manage-child-account',
  imports: [MainContainer, CurrencyPipe, InputNumberModule , InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './manage-child-account-page.html',
  styleUrl: './manage-child-account-page.css',
})
export class ManageChildAccountPage implements OnInit {

  private _confirmationService = inject(ConfirmationService);
  private _store = inject(Store);
  private _parentService = inject(ParentService);
  private _parentId!: string;
  private _actions$ = inject(Actions);
  childMoneyAccount$ = this._store.pipe(select(selectors.childMoneyAccountSelector), startWith(null));

  /**
   * Les données du compte d'argent de poche.
   * Ces données sont récupérées depuis le state de l'application
   */
  childMoneyAccount!: ChildMoneyAccount


  /**
   * Proprieté pour mise à jour des données du compte
   */
  newMoneyAtPeriodStart!: number;
  newChildName!: string;

  ngOnInit(): void {
      // Récupération des données du compte d'argent
      this.childMoneyAccount = history.state.childMoneyAccount;
      this.newMoneyAtPeriodStart = this.childMoneyAccount.moneyAtPeriodStart;
      this.newChildName = this.childMoneyAccount.childName;
      this._parentId = this.getParentId();
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
          parentId: this._parentId,
          updatedMoneyAtPeriodStart : this.newMoneyAtPeriodStart
        }

        this._store.dispatch(actions.updateInitialStartMoneyAction({ updatedIntialMoneyDto: updateInitialMoneyDto }));
      }
    });
  }

  /**
   * Réinitialisation de l'argent de poche restant
   */
  reinitializeRemainingMoney(): void {
    this._confirmationService.confirm({
      message: 'Réinitialiser l\'argent de poche?',
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
          parentId: this._parentId
        }

        this._store.dispatch(actions.reinitializeRemainingMoneyAction({ reinitializeRemainingMoneyDto }));

        this._actions$
        .pipe(ofType(actions.refreshChildAccountSuccessAction),
        take(1),
        switchMap(() => this.childMoneyAccount$)
        ).subscribe(childAccount => {
          this.childMoneyAccount.remainingMoney = childAccount!.remainingMoney
        })
      }
    })
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
          parentId: this._parentId,
          updateChildName : this.newChildName
        }

        this._store.dispatch(actions.updateChildNameAction({ updatedChildNameDto: updateChildNameDto }));
      }
    });
  }

  /**
   * Mise à jour de la photo
   */
  updatePhoto(): void {

  }

  /**
   * Chargement de la nouvelle photo
   * @param file  La photo choisie
   */
  loadSelectedFile(file: File | undefined): void {

  }

  /**
   * Récupération du parent
   */
  getParentId(): string {
    const parentAuth = this._parentService.getAuthenticatedParent();

    if(parentAuth === null) {
      this._store.dispatch(actions.displayMessageAction({ message: {
        isError: true,
        title: '',
        message: 'Echec récupération récupération identification parent'
      } }));
      throw new Error('');
    }
    return parentAuth.parentId;
  }

}
