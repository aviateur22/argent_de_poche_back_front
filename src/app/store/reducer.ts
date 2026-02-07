import { createReducer } from "@ngrx/store";
import { ApplicationState } from "./state";

export const initialState: ApplicationState = {
  childMoney: {
    childImageName: "",
    childName: "",
    remainingMoney: 0,
    moneyAtPeriodStart: 0,
    periodName: "",
    startPeriodDate: undefined,
    endPeriodDate: undefined
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
  initialState

)
