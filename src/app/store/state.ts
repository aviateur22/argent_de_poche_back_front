import { ChildMoney, FlashMessage, RequestStatus } from "./model";

export interface ApplicationState {
  childMoney: ChildMoney,
  flashMessage: FlashMessage,
  requestStatus: RequestStatus
}
