import { ChildMoneyAccount, DisplayRemainingMoneyOnChange, FamilyAccount, FlashMessage, IsCoinAnimationActive, IsConfettiAnimationActive, Parent, RequestStatus } from "./model";

export interface ApplicationState {
  parent: Parent,
  familyAccount: FamilyAccount,
  childMoneyAccount: ChildMoneyAccount,
  flashMessage: FlashMessage,
  requestStatus: RequestStatus,
  displayRemainingMoneyOnChange: DisplayRemainingMoneyOnChange,
  isCoinAnimationActive: IsCoinAnimationActive,
  isConfettiAnimationActive: IsConfettiAnimationActive
}
