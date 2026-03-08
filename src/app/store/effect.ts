import { inject } from "@angular/core/primitives/di"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MessageService } from "primeng/api";
import * as actions from "./actions";
import { from, mergeMap, tap, of, catchError } from "rxjs";
import { ChildMoneyAccountService } from "../services/child-money-account.service";
import { FamilyAccountService } from "../services/family-account.service";
import { AuthService } from "../services/auth.service";
import { ParentService } from "../services/parent.service";
import { Parent } from "../models/parent.model";
import { Router } from "@angular/router";
import pageUrl from "../../misc/page-url";

export class Effect {

  private _actions$ = inject(Actions);
  private _messageService = inject(MessageService);
  private _childMoneyService = inject(ChildMoneyAccountService);
  private _familyAccountService = inject(FamilyAccountService);
  private _authService = inject(AuthService);
  private _parentService = inject(ParentService);
  private _router = inject(Router);

  /**
   * Connexion au compte familliale
   */
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.loginAction),
      mergeMap(({ loginDto }) =>
        this._authService.login(loginDto).pipe(
          mergeMap(response => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: response.message
                }
                }),
              actions.loginSuccessAction({ loginResponse: response })
          ])),
            catchError(error =>
            of(
              actions.loginFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.error.errorMessage
                }
              })
            )
          )
        )
      )
    )
  );

  /**
   * Connexion au compte familliale
   */
  loginSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.loginSuccessAction),
      tap(({ loginResponse }) =>  {
        const jwt = loginResponse.jwt;
        const parent: Parent = {
          parentId: loginResponse.parentId,
          parentName: loginResponse.parentName,
          familyName: loginResponse.familyName,
          roles: loginResponse.roles,
          sessionValidUntil: loginResponse.jwtExpiredAt
        }
        this._parentService.persistAuthentifiedParent(parent, jwt);
        this._router.navigate([pageUrl.familyAccount.url]);
      })
    ),
    { dispatch: false }
  );

  /**
   * Création d'un compte d'argent de poche
   */
  createChildAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createChildAccountAction),
      mergeMap(({ createChildAccountDto }) =>
        this._childMoneyService.createChildMoneyAccount(createChildAccountDto).pipe(
          mergeMap(createdChildAccount => from([
             actions.isDisplayConfettiAnimationAction({isActive: true}),
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Le compte a été créé"
                }
                }),
              actions.refreshChildAccountAction({childAccountId: createdChildAccount.createdChildAccountId , parentId: createChildAccountDto.parentId }),
              actions.createChildAccountSuccessAction({ childAccountId: createdChildAccount.createdChildAccountId })
          ])),
            catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.error.errorMessage
                }
              })
            )
          )
        )
      )
    )
  );

  /**
   * Redirection vers le compte d'argent de poche apres sa creation
   */
 createChildAccountSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createChildAccountSuccessAction),
      tap(({ childAccountId }) => {
        var url  = pageUrl.childAccount.url.replace(':childAccountId', childAccountId);
        this._router.navigate([url]);
      })
    ),
    { dispatch: false }
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
                  message: error.error.errorMessage
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
                  message: error.error.errorMessage
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
              actions.refreshChildAccountAction({childAccountId: response.childAccountId , parentId: addMoneyMovement.parentId}),
              actions.isDisplayCoinAnimationAction({ isActive: true })
            ])),
            catchError(error =>
            of(
              actions.refreshChildAccountFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.error.errorMessage
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
                  message: error.error.errorMessage
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
                  message: error.error.errorMessage
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
                  message: error.error.errorMessage
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
                  message: error.error.errorMessage
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
              actions.loadFamilyAccountSuccessAction({ family: response })
          ])),
            catchError(error =>
            of(
              actions.loadFamilyAccountFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.error.errorMessage
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
              actions.createFamilyAccountSuccessAction(),
              actions.isDisplayConfettiAnimationAction({isActive: true}),
          ])),
            catchError(error =>
            of(
              actions.createFamilyAccounFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.error.errorMessage
                }
              })
            )
          )
        )
      )
    )
  );

/**
 * Redirection vers la page de succés de création d'un compte familiale
 */
 createFamilyAccountSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createFamilyAccountSuccessAction),
      tap( _ => {
        var url  = pageUrl.createFamilyAccountSuccess.url;
        this._router.navigate([url]);
      })
    ),
    { dispatch: false }
  );

  /**
   * Désactivation d'un compte d'argent de poche
   */
  desactivateChildAccount$ = createEffect(() =>
       this._actions$.pipe(
      ofType(actions.desactivateChildAccountAction),
      mergeMap(({ dto }) =>
        this._childMoneyService.desactivateChildAccount(dto).pipe(
          mergeMap(response => from([
             actions.displayMessageAction({
                message: {
                  title: "",
                  isError: false,
                  message: "Le compte d'argent de poche est désactiver"
                }
                }),
              actions.desactivateChildAccountSuccessAction(),
          ])),
            catchError(error =>
            of(
              actions.desactivateChildAccountFailedAction(),
              actions.displayMessageAction({
                message: {
                  title: "",
                  isError: true,
                  message: error.error.errorMessage
                }
              })
            )
          )
        )
      )
    )
  );

  /**
   * Redirection vers la page de succés quand le compte est désactivé
   */
 desactivateChildAccountSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.desactivateChildAccountSuccessAction),
      tap( _ => {
        var url  = pageUrl.desactivateChildAccountSuccess.url;
        this._router.navigate([url]);
      })
    ),
    { dispatch: false }
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
