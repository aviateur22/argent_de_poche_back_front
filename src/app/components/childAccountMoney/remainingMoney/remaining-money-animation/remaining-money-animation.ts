import { Component, inject, Input } from '@angular/core';
import * as selectors from '../../../../store/selector';
import { select, Store } from '@ngrx/store';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { map, pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-remaining-money-animation',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './remaining-money-animation.html',
  styleUrl: './remaining-money-animation.css',
})
export class RemainingMoneyAnimation {
    private _store = inject(Store);

    isRemainingMoneyUpdate$ = this._store.pipe(select(selectors.isRemainingMoneyVisibleSelector));
    account$ = this._store.pipe(select(selectors.childMoneyAccountSelector));
}
