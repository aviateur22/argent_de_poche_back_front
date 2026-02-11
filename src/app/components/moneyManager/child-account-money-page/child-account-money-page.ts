import { Component, inject, OnInit } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { ActivatedRoute } from '@angular/router';
import { ParentService } from '../../../services/parent.service';
import { Store } from '@ngrx/store';
import { loadChildAccountAction } from '../../../store/actions';

@Component({
  selector: 'app-child-account-money-page',
  imports: [MainContainer],
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
