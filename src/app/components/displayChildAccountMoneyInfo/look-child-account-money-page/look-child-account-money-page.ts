import { Component, inject, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { displayChildAccountInfoAction } from '../../../store/actions';
import { ActualDate } from "../../childAccountMoney/actual-date/actual-date";
import { ChildAccountWrapper } from "../../childAccountMoney/child-account-wrapper/child-account-wrapper";
import { WeekInformation } from "../../childAccountMoney/week-information/week-information";

import { CommonModule } from '@angular/common';
import pageUrl from '../../../../misc/page-url';
import { RemaminigMoney } from '../../childAccountMoney/remainingMoney/remaminig-money/remaminig-money';
import { ChildDisplayInformation } from '../childInformation/child-information/child-display-information';

@Component({
  selector: 'app-look-child-account-money-page',
  imports: [CommonModule, MainContainer, ActualDate, ChildAccountWrapper, WeekInformation, RemaminigMoney, ChildDisplayInformation],
  templateUrl: './look-child-account-money-page.html',
  styleUrl: './look-child-account-money-page.css',
})
export class LookChildAccountMoneyPage implements OnInit {
  private _activateRoute = inject(ActivatedRoute);
  private _store = inject(Store);
  private _router = inject(Router);

  ngOnInit(): void {
    this.loadChildAccount();
  }

  loadChildAccount() {
    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');

    if(childAccountId)
      this._store.dispatch(displayChildAccountInfoAction({ childAccountId }));
  }

  /**
   * Redirection
   */
    redirect() {
    var url = pageUrl.familyAccount.url;
    this._router.navigate([url]);

    }
}
