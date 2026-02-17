import { createReducer, on } from "@ngrx/store";
import { ApplicationState } from "./state";
import * as actions from "./actions";

export const initialState: ApplicationState = {
  childMoneyAccount: {
    childImageName: "",
    childName: "",
    remainingMoney: 0,
    moneyAtPeriodStart: 0,
    periodName: "",
    startPeriodDate: undefined,
    endPeriodDate: undefined,
    actualDate: undefined,
    childMoneyAccountId: "",
    availableReasonMovements: []
  },
  flashMessage: {
    title: "",
    message: "",
    isError: false
  },
  requestStatus: {
    isLoading: false,
    isSuccess: false
  }
}

export const applicationReducers  = createReducer(
  initialState,
  on(actions.loadChildAccountAction, state =>({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.refreshChildAccountAction, state =>({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.updateChildNameAction, state =>({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.updateInitialStartMoneyAction, state =>({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
    on(actions.reinitializeRemainingMoneyAction, state =>({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.loadChildAccountSuccessAction, (state, {childAccountMoneyDto}) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    },
    childMoneyAccount: {
      actualDate: childAccountMoneyDto.actualDate,
      childMoneyAccountId: childAccountMoneyDto.childAccountIdentity,
      childImageName: childAccountMoneyDto.imageRandomName,
      childName: childAccountMoneyDto.childName,
      remainingMoney: childAccountMoneyDto.remainingMoney,
      moneyAtPeriodStart: childAccountMoneyDto.moneyAtPeriodStart,
      periodName: childAccountMoneyDto.periodName,
      startPeriodDate: childAccountMoneyDto.startPeriodDate,
      endPeriodDate: childAccountMoneyDto.endPeriodDate,
      availableReasonMovements: childAccountMoneyDto.availableMovementReasonDtos
    }
  })),
  on(actions.loadChildAccountFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.updateChildNameFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.updateInitialStartMoneyFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.reinitializeRemainingMoneyFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.refreshChildAccountSuccessAction, (state, {childAccountMoneyDto}) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    },
    childMoneyAccount: {
      ...state.childMoneyAccount,
      childImageName: childAccountMoneyDto.imageRandomName,
      remainingMoney: childAccountMoneyDto.remainingMoney,
      moneyAtPeriodStart: childAccountMoneyDto.moneyAtPeriodStart
    }
  })),
   on(actions.refreshChildAccountFailedAction, (state) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
)
