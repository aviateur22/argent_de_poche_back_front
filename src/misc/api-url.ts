import { environment } from "../environment/environment";

export default {
  loadChildAccount: {
    url: `${environment.api_base}/child-accounts/parent/{parentId}/child-account/{childAccountId}/load-child-money-account`
  },
  streamChildImage: {
    url: `${environment.api_base}/child-accounts/stream/image/{imageName}/parent/{parentId}/child-account/{childAccountId}`
  },
  addMoneyMovement: {
    url: `${environment.api_base}/child-accounts/add-money-movement`
  },
  updateChildName: {
    url: `${environment.api_base}/child-accounts/update-child-name`
  },
  reinitializeRemainingMoney: {
    url: `${environment.api_base}/child-accounts/reinitialize-remaining-money`
  },
  updateMoneyAtPeriodStart: {
    url: `${environment.api_base}/child-accounts/update-initial-child-Money`
  }
}
