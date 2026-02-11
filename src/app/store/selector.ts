import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { ApplicationState } from "./state";

export const FeatureKey = 'APPLICATION_STATE';
export const selectApplicationState = createFeatureSelector<ApplicationState>(FeatureKey);


/**
 * ChildAccount
 */
export const childMoneyAccountSelector = createSelector(selectApplicationState, state => state.childMoney.childMoneyAccountId);
export const startPeriodDateSelector = createSelector(selectApplicationState, state => state.childMoney.startPeriodDate);
export const endPeriodDateSelector = createSelector(selectApplicationState, state => state.childMoney.endPeriodDate);
export const childNameSelector = createSelector(selectApplicationState, state => state.childMoney.childName);
export const childImageSelector = createSelector(selectApplicationState, state => state.childMoney.childImageName);
export const remainingMoneySelector = createSelector(selectApplicationState, state => state.childMoney.remainingMoney);
export const moneyAtPeriodStartSelector = createSelector(selectApplicationState, state => state.childMoney.moneyAtPeriodStart);
export const actualDateSelector = createSelector(selectApplicationState, state => state.childMoney.actualDate);
