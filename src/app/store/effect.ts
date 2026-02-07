import { inject } from "@angular/core/primitives/di"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MessageService } from "primeng/api";
import * as actions from "./actions";
import { from, mergeMap, tap, of, catchError } from "rxjs";
import { ChildMoneyService } from "../services/child-money.service";
import { Router } from "@angular/router";
import pageUrl from "../../misc/page-url";
export class Effect {

  private _actions$ = inject(Actions);
  private _messageService = inject(MessageService);
  private _childMoneyService = inject(ChildMoneyService);
  private _router = inject(Router);

/**
 * Child Money
 */
  loadChildAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.loadChildAccountAction),
      mergeMap(({ childAccountId, parentId }) =>
        this._childMoneyService.loadChildAccount(parentId, childAccountId).pipe(
          mergeMap( response => from([
            actions.loadChildAccountSuccessAction(),
            actions.displayMessageAction({
              message: {
                title: "",
                isError: false,
                message: response.message
              }
            })
          ])
          ),
          catchError(error =>
            of(
              actions.loadChildAccountFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.message
                }
              })
            )
          )
        )
      )
    )
  )

  /**
   * Message flash
   */
  displayMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.displayMessageAction),
      tap(({message}) =>
        this._messageService.add({severity: message.isError ? 'error' : 'success', detail: message.message})
      )
    ),
    { dispatch: false }
  )
}
