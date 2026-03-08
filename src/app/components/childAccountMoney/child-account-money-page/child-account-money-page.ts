import { Component, inject, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from '../../../services/parent.service';
import { Store } from '@ngrx/store';
import { loadChildAccountAction } from '../../../store/actions';
import { ActualDate } from "../actual-date/actual-date";
import { ChildInformation } from "../childInformation/child-information/child-information";
import { ChildAccountWrapper } from "../child-account-wrapper/child-account-wrapper";
import { WeekInformation } from "../week-information/week-information";

import { MoneyMouvement } from "../reasonMovement/money-mouvement/money-mouvement";
import { CommonModule } from '@angular/common';
import pageUrl from '../../../../misc/page-url';
import { RemaminigMoney } from '../remainingMoney/remaminig-money/remaminig-money';

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
  private _router = inject(Router);



  ngOnInit(): void {
    this.loadChildAccount();
  }

  loadChildAccount() {
    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');
    const parentId = this._parentService.getParentId();

    if(childAccountId && parentId)
      this._store.dispatch(loadChildAccountAction({ parentId, childAccountId: childAccountId}));
  }

    /**
     * Redirection
     */
     redirect() {
      var url = pageUrl.familyAccount.url;
      this._router.navigate([url]);

    }
}
