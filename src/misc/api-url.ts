import { environment } from "../environment/environment";

export default {
  loadChildAccount : {
    url: `${environment.api_base}/child-accounts/parent/{parentId}/child-account/{childAccountId}/load-child-money-account`
  }
}
