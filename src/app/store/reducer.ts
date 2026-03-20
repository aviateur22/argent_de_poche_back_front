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
  },
  familyAccount: {
    childAccounts: [],
    familyAccountId: ""
  },
  displayRemainingMoneyOnChange: {
    isVisible: false
  },
  parent: {
    parentName: "",
    familyName: ""
  },
  isCoinAnimationActive: {
    isActive: false
  },
  isConfettiAnimationActive: {
    isActive: false
  }
}

export const applicationReducers  = createReducer(
  initialState,
  on(actions.logoutAction, () => initialState),
  on(actions.refreshParentAction, (state, { parentName, familyName }) => ({
    ...state, parent: {
      parentName: parentName,
      familyName: familyName
    }
  })),
  on(actions.loginAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.loginSuccessAction, (state, { loginResponse } ) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    },
    parent: {
      parentName: loginResponse.parentName,
      familyName: loginResponse.familyName
    }
  })),
  on(actions.loginFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.loadFamilyAccountAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.loadFamilyAccountSuccessAction, (state, { family }) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    },
    familyAccount: {
      familyAccountId: family.familyAccountId,
      childAccounts: family.childs
    }
  })),
  on(actions.loadFamilyAccountFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.createFamilyAccountAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.createFamilyAccountSuccessAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    }
  })),
  on(actions.createFamilyAccounFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.refreshChildAccountAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.updateChildNameAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.updateInitialStartMoneyAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.updateChildImageAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
    on(actions.reinitializeRemainingMoneyAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.loadChildAccountAction, state => ({
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
  on(actions.resetChildAccountAction, (state) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    },
    childMoneyAccount: initialState.childMoneyAccount
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
  on(actions.createChildAccountAction, state => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.createChildAccountSuccessAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    }
  })),
  on(actions.createChildFailedAction, state => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.isRemainingMoneyVisibleAction, (state, { isVisible }) => ({
    ...state, displayRemainingMoneyOnChange: {
      isVisible
    }
  })),
  on(actions.isDisplayCoinAnimationAction, (state, { isActive }) => ({
    ...state, isCoinAnimationActive: {
      isActive
    }
  })),
   on(actions.isDisplayConfettiAnimationAction, (state, { isActive }) => ({
    ...state, isConfettiAnimationActive: {
      isActive
    }
  })),
  on(actions.desactivateChildAccountAction, (state ) => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
   on(actions.desactivateChildAccountSuccessAction, (state ) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    }
  })),
  on(actions.desactivateChildAccountFailedAction, (state ) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),
  on(actions.displayChildAccountInfoAction, (state ) => ({
    ...state, requestStatus: {
      isLoading: true,
      isSuccess: false
    }
  })),
  on(actions.displayChildAccountInfoSuccessAction, (state, { displayChildAccountInfoDto } ) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: true
    }, childMoneyAccount: {
      childMoneyAccountId: displayChildAccountInfoDto.childAccountIdentity,
      childName: displayChildAccountInfoDto.childName,
      remainingMoney: displayChildAccountInfoDto.remainingMoney,
      moneyAtPeriodStart: displayChildAccountInfoDto.moneyAtPeriodStart,
      periodName: "",
      startPeriodDate: displayChildAccountInfoDto.startPeriodDate,
      endPeriodDate: displayChildAccountInfoDto.endPeriodDate,
      actualDate: displayChildAccountInfoDto.actualDate,
      availableReasonMovements: [],
      childImageName: ""
    }
  })),
  on(actions.displayChildAccountInfoFailedAction, (state ) => ({
    ...state, requestStatus: {
      isLoading: false,
      isSuccess: false
    }
  })),

)
