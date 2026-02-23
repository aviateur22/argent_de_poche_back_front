import { environment } from "../environment/environment";

export default {
  loadFamilyChildAccounts: {
    url: `${environment.api_base}/family-accounts/parent/{parentId}/load-family-child-accounts`
  },
  createFamilyAccount: {
    url: `${environment.api_base}/family-accounts/create-family-account`
  },
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
  },
  updateChildAccountImage: {
    url: `${environment.api_base}/child-accounts/update-image`
  },
  createChildAccount: {
    url: `${environment.api_base}/child-accounts/create-child-account`
  }
}
