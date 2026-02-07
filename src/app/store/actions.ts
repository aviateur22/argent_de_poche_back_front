import { createAction, props } from "@ngrx/store";
import { FlashMessage } from "./model";

/**
 * Child Money
 */
export const loadChildAccountAction = createAction("[loadChildAccountAction] load Child Account Action", props<{ parentId: string, childAccountId: string }>());
export const loadChildAccountSuccessAction = createAction("[loadChildAccountSuccessAction] load Child Account Success Action");
export const loadChildAccountFailedAction = createAction("[loadChildAccountSuccessAction] load Child Account Success Action");

/**
 * Flash Message
 */
export const displayMessageAction = createAction('[Share display message] display message', props<{message: FlashMessage}>())
