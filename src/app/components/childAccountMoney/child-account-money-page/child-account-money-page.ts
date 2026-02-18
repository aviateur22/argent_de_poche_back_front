import { Component, inject, OnInit } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { ActivatedRoute } from '@angular/router';
import { ParentService } from '../../../services/parent.service';
import { Store } from '@ngrx/store';
import { loadChildAccountAction } from '../../../store/actions';
import { ActualDate } from "../actual-date/actual-date";
import { ChildInformation } from "../child-information/child-information";
import { ChildAccountWrapper } from "../child-account-wrapper/child-account-wrapper";
import { WeekInformation } from "../week-information/week-information";
import { RemaminigMoney } from "../remaminig-money/remaminig-money";
import { MoneyMouvement } from "../reasonMovement/money-mouvement/money-mouvement";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-account-money-page',
  imports: [CommonModule, MainContainer, ActualDate, ChildInformation, ChildAccountWrapper, WeekInformation, RemaminigMoney, MoneyMouvement],
  templateUrl: './child-account-money-page.html',
  styleUrl: './child-account-money-page.css',
})
export class ChildAccountMoneyPage implements OnInit {
  private _activateRoute = inject(ActivatedRoute);
  private _parentService = inject(ParentService);
  private _store = inject(Store);

  ngOnInit(): void {
    this.loadChildAccount();
  }

  loadChildAccount() {
    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');
    const parentAuthenticate = this._parentService.getAuthenticatedParent();

    if(childAccountId && parentAuthenticate)
      this._store.dispatch(loadChildAccountAction({ parentId: parentAuthenticate.parentId, childAccountId: childAccountId}));
  }


}
