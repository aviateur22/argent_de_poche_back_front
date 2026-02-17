import { createAction, props } from "@ngrx/store";
import { FlashMessage } from "./model";
import { AddMoneyMovementDto, ChildAccountDto, ReinitializeRemainingMoneyDto, UpdatedChildNameDto, UpdatedIntialMoneyDto } from "../models/child-money.dto";

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

/**
 * Actions liées aux Flash Message
 */
export const displayMessageAction = createAction('[Share display message] display message', props<{message: FlashMessage}>())
