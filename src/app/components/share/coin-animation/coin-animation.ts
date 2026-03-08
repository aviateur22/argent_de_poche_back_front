import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isDisplayCoinAnimationSelector } from '../../../store/selector';
import { isDisplayCoinAnimationAction } from '../../../store/actions';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-coin-animation',
  imports: [AsyncPipe],
  templateUrl: './coin-animation.html',
  styleUrl: './coin-animation.css',
})
export class CoinAnimation implements OnInit, OnDestroy {

  private _store = inject(Store);
  private _destroy$ = new Subject<void>();

  // Récupération de l'état de visibilité de la chute des piéces
  isDisplayCoinAnimation$ = this._store.pipe(select(isDisplayCoinAnimationSelector));

  ngOnInit(): void {
    this._store.pipe(select(isDisplayCoinAnimationSelector),takeUntil(this._destroy$)
  )
  .subscribe(isDisplay => this.handleCoinAnimation(isDisplay));
  }

  ngOnDestroy(): void {
   this._destroy$.next();
   this._destroy$.complete();
  }

  handleCoinAnimation(isDisplay: boolean) {
    const isDisplayCoinAnimation = false;
    if(!isDisplay)
      return;

    timer(5000).subscribe(_ => {
      this._store.dispatch(isDisplayCoinAnimationAction({isActive: isDisplayCoinAnimation}));
    })
  }

}
