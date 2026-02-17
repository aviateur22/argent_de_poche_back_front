import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChildMoneyAccountService } from '../../../services/child-money-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from '../../../services/parent.service';
import { ChildMoneyAccount } from '../../../store/model';
import { Store } from '@ngrx/store';
import { displayMessageAction } from '../../../store/actions';
import { CapitalizePipe } from '../../../pipe/capitalize-pipe';
import pageUrl from '../../../../misc/page-url';


@Component({
  selector: 'app-child-information',
  imports: [AsyncPipe, CapitalizePipe],
  templateUrl: './child-information.html',
  styleUrl: './child-information.css',
})
export class ChildInformation implements OnChanges {
  private _store = inject(Store);
  private _childMoneyAccountService = inject(ChildMoneyAccountService);
  private _activateRoute = inject(ActivatedRoute);
  private _parentService = inject(ParentService);
  private _router = inject(Router);

  @Input() childMoneyAccount!: ChildMoneyAccount;
  imageUrl$: Observable<string> = of("");

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.childMoneyAccount?.childImageName) return;
    this.loadChildImage();
  }

  /**
   * Chargement de l'image de l'enfant
   */
  loadChildImage(): void {
    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');
    const parentAuthenticate = this._parentService.getAuthenticatedParent();

    if (!childAccountId || !parentAuthenticate) {
      this._store.dispatch(displayMessageAction({
        message: {
          isError: true,
          message: "Impossible de récupérer l'image du compte d'argent de poche",
          title: ''
        }
      }))
      throw new Error("Impossible de récupérer l'image du compte d'argent de poche");
    }

    this.imageUrl$ = this._childMoneyAccountService.streamChildImage(
      this.childMoneyAccount.childImageName,
      childAccountId,
      parentAuthenticate.parentId)
    .pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  redirectToManageChild() {
    this._router.navigate([pageUrl.manageAccount.url], {
      state: {
        childMoneyAccount: this.childMoneyAccount
      }
    })
  }
}
