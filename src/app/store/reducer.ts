import { createReducer, on } from "@ngrx/store";
import { ApplicationState } from "./state";
import * as actions from "./actions";

export const initialState: ApplicationState = {
  childMoney: {
    childImageName: "",
    childName: "",
    remainingMoney: 0,
    moneyAtPeriodStart: 0,
    periodName: "",
    startPeriodDate: undefined,
    endPeriodDate: undefined,
    actualDate: undefined,
    childMoneyAccountId: "",
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
  on(actions.loadChildAccountSuccessAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    }
  })),
  on(actions.loadChildAccountFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  }))


)
