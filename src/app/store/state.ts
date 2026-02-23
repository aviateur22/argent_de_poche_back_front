import { ChildMoneyAccount, FamilyAccount, FlashMessage, RequestStatus } from "./model";

export interface ApplicationState {
  familyAccount: FamilyAccount,
  childMoneyAccount: ChildMoneyAccount,
  flashMessage: FlashMessage,
  requestStatus: RequestStatus
}
