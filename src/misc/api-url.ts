import { environment } from "../environment/environment";

export default {
  login: {
    url: `${environment.api_base}/auth/login-to-family-account`
  },
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
  },
  desactivateChildAccount: {
    url: `${environment.api_base}/child-accounts/parent/{parentId}/child-account/{childAccountId}/desactivate-child-account`
  },
  streamQrCodeOfChildAccount: {
    url: `${environment.api_base}/child-accounts/stream/parent/{parentId}/child-account/{childAccountId}/qr-code`
  },
  displayChildAccountInfo: {
    url: `${environment.api_base}/auth/child-accounts/display/child-account/{childAccountId}/info`
  }

}
