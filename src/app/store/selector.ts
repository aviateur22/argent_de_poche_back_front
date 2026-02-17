import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { ApplicationState } from "./state";

export const FeatureKey = 'APPLICATION_STATE';
export const selectApplicationState = createFeatureSelector<ApplicationState>(FeatureKey);

/**
 * ChildAccount
 */
export const childMoneyAccountSelector = createSelector(selectApplicationState, state => state.childMoneyAccount);

/**
 * Request Status
 */
export const requestStatusSelector = createSelector(selectApplicationState, state => state.requestStatus);
