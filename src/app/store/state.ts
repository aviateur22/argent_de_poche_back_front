import { ChildMoneyAccount, FlashMessage, RequestStatus } from "./model";

export interface ApplicationState {
  childMoneyAccount: ChildMoneyAccount,
  flashMessage: FlashMessage,
  requestStatus: RequestStatus
}
