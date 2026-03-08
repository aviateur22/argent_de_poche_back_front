import { createAction, props } from "@ngrx/store";
import { FlashMessage } from "./model";
import { AddMoneyMovementDto, ChildAccountDto, CreateChildAccountDto, DesactivateChildAccountDto, ReinitializeRemainingMoneyDto, UpdatedChildNameDto, UpdatedIntialMoneyDto } from "../models/child-money.dto";
import { CreateFamilyAccountDto, FamilyAccountDto, FamilyChildAccountDto, LoadFamilyAccountDto } from "../models/family-account.dto";
import { LoginDto, LoginResponseDto } from "../models/auth.dto";

/**
 * Auth action
 */
export const loginAction = createAction("[loginAction] login Action", props<{ loginDto: LoginDto }>());
export const loginSuccessAction = createAction("[loginSuccessAction] login Success Action", props<{ loginResponse: LoginResponseDto }>());
export const loginFailedAction = createAction("[loginFailedAction] login Failed Action");
export const logoutAction = createAction("[logout] logout");

/**
 * Actions liées à la gestion du compte d'argent de poche
 */
export const loadChildAccountAction = createAction("[loadChildAccountAction] load Child Account Action", props<{ parentId: string, childAccountId: string }>());
export const loadChildAccountSuccessAction = createAction("[loadChildAccountSuccessAction] load Child Account Success Action", props<{ childAccountMoneyDto: ChildAccountDto }>());
export const loadChildAccountFailedAction = createAction("[loadChildAccountFailedAction] load Child Account Failed Action");

export const refreshChildAccountAction = createAction("[refreshChildAccountAction] refresh Child AccountAction", props<{ parentId: string, childAccountId: string }>());
export const refreshChildAccountSuccessAction = createAction("[refresh Child Account Success Action] refreshChildAccountSuccessAction", props<{ childAccountMoneyDto: ChildAccountDto }>());
export const refreshChildAccountFailedAction = createAction("[refresh Child Account Failed Action] refreshChildAccountFailedAction");

export const addMoneyMovementAction = createAction("[addMoneyMovement] add Money Movement Action", props<{addMoneyMovement: AddMoneyMovementDto}>());
export const addMoneyMovementSucessAction = createAction("[addMoneyMovementSucessAction] add Money Movement Sucess Action");
export const addMoneyMovementFailedAction = createAction("[addMoneyMovementFailedAction] add Money Movement Failed Action");

export const updateInitialStartMoneyAction = createAction("[updateInitialStartMoneyAction] update Initial Start Money Action", props<{ updatedIntialMoneyDto: UpdatedIntialMoneyDto }>());
export const updateInitialStartMoneySuccessAction = createAction("[updateInitialStartMoneySuccessAction] update Initial Start Money Success Action", props<{ childAccountMoneyDto: ChildAccountDto }>());
export const updateInitialStartMoneyFailedAction = createAction("[updateInitialStartMoneyFailedAction] update Initial Start Money Failed Action");

export const reinitializeRemainingMoneyAction = createAction("[reinitializeRemainingMoneyAction] refreshRemainingMoneyAction", props<{ reinitializeRemainingMoneyDto: ReinitializeRemainingMoneyDto }>());
export const reinitializeRemainingMoneySuccessAction = createAction("[reinitializeRemainingMoneySuccessAction] refresh Remaining Money Success Action", props<{ reinitializeRemainingMoneyDto: ReinitializeRemainingMoneyDto }>());
export const reinitializeRemainingMoneyFailedAction = createAction("[reinitializeRemainingMoneyFailedAction] refresh Remaining Money Failed Action");

export const updateChildNameAction = createAction("[updateChildNameAction] update Child Name Action", props<{ updatedChildNameDto: UpdatedChildNameDto }>());
export const updateChildNameSuccessAction = createAction("[updateChildNameSuccessAction] update Child Name Success Action", props<{ childAccountMoneyDto: ChildAccountDto }>());
export const updateChildNameFailedAction = createAction("[updateChildNameFailedAction] update Child Name Failed Action");

export const updateChildImageAction = createAction("[updateChildImageAction] update Child Image Action", props<{ updateChildImageDto: FormData}>());
export const updateChildImageCompleteAction = createAction("[updateChildImageCompleteAction] update Child Image Complete Action");
export const updateChildImageFailedAction = createAction("[updateChildImageFailedAction] update Child Image Failed Action");

export const createChildAccountAction = createAction("[createChildAccountAction] create Child Account Action", props<{ createChildAccountDto: CreateChildAccountDto }>());
export const createChildAccountSuccessAction = createAction("[createChildAccountSuccessAction] create Child Account Success Action", props<{ childAccountId: string }>());
export const createChildFailedAction = createAction("[createChildFailedAction] create Child Failed Action");

export const desactivateChildAccountAction = createAction("[desactivateChildAccountAction]", props<{ dto: DesactivateChildAccountDto }>());
export const desactivateChildAccountSuccessAction = createAction("[desactivateChildAccountSuccessAction] desactivate Child Account Success Action");
export const desactivateChildAccountFailedAction = createAction("[desactivateChildAccountFailedAction] desactivate Child Account Failed Action");

/**
 * Action liée a l'affichage de l'argent restant quand il est modifié
 */
export const isRemainingMoneyVisibleAction = createAction("[isRemainingMoneyVisible] is Remaining Money Visible", props<{ isVisible: boolean }>());

/**
 * Actions liées à la gestion du compte de famille
 */
export const loadFamilyAccountAction = createAction("[loadFamilyAccountAction] load Family Account Action", props<{ loadFamilyAccountDto: LoadFamilyAccountDto }>());
export const loadFamilyAccountSuccessAction = createAction("[loadFamilyAccountSuccessAction] load Family Account Success Action", props<{ family: FamilyAccountDto }>());
export const loadFamilyAccountFailedAction = createAction("[loadFamilyAccountFailedAction] load Family Account Failed Action");

export const createFamilyAccountAction = createAction("[createFamilyAccountAction] createFamilyAccountAction", props<{ createFamilyAccountDto: CreateFamilyAccountDto}>());
export const createFamilyAccountSuccessAction = createAction("[createFamilyAccountSuccessAction] createFamilyAccountSuccessAction");
export const createFamilyAccounFailedAction = createAction("[createFamilyAccounFailedAction] createFamilyAccounFailedAction");

/**
 * Actions liées aux Flash Message
 */
export const displayMessageAction = createAction('[Share display message] display message', props<{message: FlashMessage}>());

/**
 * Action liée à l'animation de l'argent
 */
export const isDisplayCoinAnimationAction = createAction('[displayCoinAnimationAction] displayCoinAnimationAction', props<{ isActive: boolean }>())

/**
 * Action liée à l'animation des confetti
 */
export const isDisplayConfettiAnimationAction = createAction('[DisplayConfettiAnimationAction] Display Confetti Animation Action', props<{ isActive: boolean }>())

