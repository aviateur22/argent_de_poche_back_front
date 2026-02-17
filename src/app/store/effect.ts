import { inject } from "@angular/core/primitives/di"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MessageService } from "primeng/api";
import * as actions from "./actions";
import { from, mergeMap, tap, of, catchError } from "rxjs";
import { ChildMoneyAccountService } from "../services/child-money-account.service";

export class Effect {

  private _actions$ = inject(Actions);
  private _messageService = inject(MessageService);
  private _childMoneyService = inject(ChildMoneyAccountService);

/**
 * Load Child Money
 */
  loadChildAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.loadChildAccountAction),
      mergeMap(({ childAccountId, parentId }) =>
        this._childMoneyService.loadChildAccount(parentId, childAccountId).pipe(
          mergeMap( response => from([
            actions.loadChildAccountSuccessAction({childAccountMoneyDto: response}),
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
  );

/**
 * Refresh des données du compte d'argent de poche
 */
  refreshChildAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.refreshChildAccountAction),
      mergeMap(({ childAccountId, parentId }) =>
        this._childMoneyService.loadChildAccount(parentId, childAccountId).pipe(
          mergeMap( response => from([
            actions.refreshChildAccountSuccessAction({childAccountMoneyDto: response}),

          ])
          ),
          catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
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
  );

  /**
   * Ajout d'un mouvement d'argent
   */
  addMoneyMovement$ = createEffect(() =>
    this._actions$.pipe(
        ofType(actions.addMoneyMovementAction),
        mergeMap(({ addMoneyMovement }) =>
          this._childMoneyService.addMoneyMovement(addMoneyMovement).pipe(
            mergeMap(response => from([
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Le mouvement d'argent est ajouté"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: response.childAccountId , parentId: addMoneyMovement.parentId})
            ])),
            catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
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
  );

  /**
   * Modification du prenom de l'enfant
   */
  updateChildName$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.updateChildNameAction),
      mergeMap(({ updatedChildNameDto }) =>
        this._childMoneyService.updateChildName(updatedChildNameDto).pipe(
          mergeMap(updatedChildAccount => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Le prénom a été mis à jour"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: updatedChildAccount.childAccountId , parentId: updatedChildNameDto.parentId })
          ])),
            catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
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
  );

  /**
   * Mise a jour de l'argent de piche disponible
   */
  updateInitialMoney$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.updateInitialStartMoneyAction),
      mergeMap(({ updatedIntialMoneyDto }) =>
        this._childMoneyService.updateIntialMoney(updatedIntialMoneyDto).pipe(
          mergeMap(updatedChildAccount => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "L'argent de poche a été mise à jour"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: updatedChildAccount.childAccountId , parentId: updatedIntialMoneyDto.parentId })
          ])),
            catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
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
  );

  /**
   * Réinitialisation de l'argent de poche disponible
   */
    reinitializeRemainingMoney$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.reinitializeRemainingMoneyAction),
      mergeMap(({ reinitializeRemainingMoneyDto }) =>
        this._childMoneyService.reinitializeRemainingMoney(reinitializeRemainingMoneyDto).pipe(
          mergeMap(updatedChildAccount => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "L'argent de poche a été mise à jour"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: updatedChildAccount.childAccountId , parentId: reinitializeRemainingMoneyDto.parentId })
          ])),
            catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
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
  );

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
