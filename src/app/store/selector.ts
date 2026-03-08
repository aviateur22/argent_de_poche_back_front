import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { ApplicationState } from "./state";

export const FeatureKey = 'APPLICATION_STATE';
export const selectApplicationState = createFeatureSelector<ApplicationState>(FeatureKey);
/**
 * FamilyAccount
 */
export const familyAccountSelector = createSelector(selectApplicationState, state => state.familyAccount);

/**
 * Parent
 */
export const parentSelector = createSelector(selectApplicationState, state => state.parent);

/**
 * ChildAccount
 */
export const childMoneyAccountSelector = createSelector(selectApplicationState, state => state.childMoneyAccount);

/**
 * Request Status
 */
export const requestStatusSelector = createSelector(selectApplicationState, state => state.requestStatus);

/**
 * Visibilité du composant "app-remaining-money-animation"
 */
export const isRemainingMoneyVisibleSelector = createSelector(selectApplicationState, state => state.displayRemainingMoneyOnChange.isVisible);

/**
 * Animation chute des pieces
 */
export const isDisplayCoinAnimationSelector = createSelector(selectApplicationState, state => state.isCoinAnimationActive.isActive);

/**
 * Animation confetti
 */
export const isDisplayConfettiAnimationSelector = createSelector(selectApplicationState, state => state.isConfettiAnimationActive.isActive);
