import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParentService } from '../../../../services/parent.service';
import { addMoneyMovementAction, displayMessageAction } from '../../../../store/actions';
import { AddMoneyMovementDto } from '../../../../models/child-money.dto';

@Component({
  selector: 'app-reason-button',
  imports: [],
  templateUrl: './reason-button.html',
  styleUrl: './reason-button.css',
})
export class ReasonButton {
  private _store = inject(Store);
  private _activateRoute = inject(ActivatedRoute);
  private _parentService = inject(ParentService);

  @Input() actionCode!: string;
  @Input() reasonCode!: string;


  addMoneyMovement() {

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

    const addMoneyMovement: AddMoneyMovementDto = {
      actionCode: this.actionCode,
      reasonCode: this.reasonCode,
      parentId: parentAuthenticate?.parentId,
      childAccountId: childAccountId

    }
    this._store.dispatch(addMoneyMovementAction({ addMoneyMovement }));

  }
}
