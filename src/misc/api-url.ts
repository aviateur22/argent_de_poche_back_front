import { environment } from "../environment/environment";

export default {
  loadChildAccount : {
    url: `${environment.api_base}/child-accounts/`// Param parentId et childAccountId ajoutés dans le service
  }
}
