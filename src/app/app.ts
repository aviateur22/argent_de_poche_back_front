import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoadingOverlay } from "./components/share/loading-overlay/loading-overlay";
import { RemainingMoneyAnimation } from "./components/childAccountMoney/remainingMoney/remaining-money-animation/remaining-money-animation";
import { Nav } from "./components/share/navBar/nav/nav";
import { ConfirmDialog } from "primeng/confirmdialog";
import { CoinAnimation } from "./components/share/coin-animation/coin-animation";
import { filter, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { Confetti } from "./components/share/confetti-animation/confetti";
import { select, Store } from '@ngrx/store';
import { isDisplayConfettiAnimationSelector } from './store/selector';
import { isDisplayConfettiAnimationAction } from './store/actions';
import { AsyncPipe } from '@angular/common';
import { RestoreService } from './services/restore.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, ToastModule, LoadingOverlay, RemainingMoneyAnimation, Nav, ConfirmDialog, CoinAnimation, Confetti],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  private _store = inject(Store);
  private _router = inject(Router);
  private _restoreService = inject(RestoreService);
  private _destroy$ = new Subject<void>();

  // Récupération de l'état de visibilité de la chute des piéces
  animatePage = signal(false);

  // Récupération de la visibilité des confetti
  isDisplayConfettiAnimation$ = this._store.pipe(select(isDisplayConfettiAnimationSelector));

  protected readonly title = signal('argent-de-poche');

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
   this._restoreService.refresh();

   this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        this.animatePage.set(false);
        return timer(0);
      })
    ).subscribe(() => {
      this.animatePage.set(true);
    });

     this._store
     .pipe(select(isDisplayConfettiAnimationSelector),takeUntil(this._destroy$)
      )
      .subscribe(isDisplay => this.handleConfettiAnimation(isDisplay));
  }


  handleConfettiAnimation(isDisplay: boolean) {
    const isConfettiDisplayActive = false;
    if(!isDisplay)
      return;

    timer(5000).subscribe(_ => {
      this._store.dispatch(isDisplayConfettiAnimationAction({isActive: isConfettiDisplayActive}));
    })
  }

}
