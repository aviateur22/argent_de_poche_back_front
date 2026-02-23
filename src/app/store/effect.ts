import { inject } from "@angular/core/primitives/di"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MessageService } from "primeng/api";
import * as actions from "./actions";
import { from, mergeMap, tap, of, catchError } from "rxjs";
import { ChildMoneyAccountService } from "../services/child-money-account.service";
import { FamilyAccountService } from "../services/family-account.service";

export class Effect {

  private _actions$ = inject(Actions);
  private _messageService = inject(MessageService);
  private _childMoneyService = inject(ChildMoneyAccountService);
  private _familyAccountService = inject(FamilyAccountService);


  /**
   * Création d'un compte d'argent de poche
   */
  createChildAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createChildAccountAction),
      mergeMap(({ createChildAccountDto }) =>
        this._childMoneyService.createChildMoneyAccount(createChildAccountDto).pipe(
          mergeMap(createdChildAccount => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Le compte a été créé"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: createdChildAccount.createdChildAccountId , parentId: createChildAccountDto.parentId })
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
   * Mise à jour de l'image
   */
  updateChildmage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.updateChildImageAction),
      mergeMap(({ updateChildImageDto }) =>
        this._childMoneyService.updateChildImage(updateChildImageDto).pipe(
          mergeMap(updatedChildAccount => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "L'image est mise à jour"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: updatedChildAccount.childAccountId , parentId: updateChildImageDto.get("parentId")! as string })
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
   * Chargement d'une famille
   */
  loadFamilyAccount$ = createEffect(() =>
       this._actions$.pipe(
      ofType(actions.loadFamilyAccountAction),
      mergeMap(({ loadFamilyAccountDto }) =>
        this._familyAccountService.loadFamilyAccount(loadFamilyAccountDto).pipe(
          mergeMap(response => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Les comptes de la famille"
                }
                }),
              actions.loadFamilyAccountSuccessAction({ familyName: response.familyName, childAccounts: response.childs })
          ])),
            catchError(error =>
            of(
              actions.loadFamilyAccountFailedAction(),
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
   * Creation d'un nouveau compte familiale
   */
  createFamilyAccount$ = createEffect(() =>
       this._actions$.pipe(
      ofType(actions.createFamilyAccountAction),
      mergeMap(({ createFamilyAccountDto }) =>
        this._familyAccountService.createFamilyAccount(createFamilyAccountDto).pipe(
          mergeMap(response => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Le nouveau compte familiale a été créé"
                }
                }),
              actions.createFamilyAccountSuccessAction()
          ])),
            catchError(error =>
            of(
              actions.createFamilyAccounFailedAction(),
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
