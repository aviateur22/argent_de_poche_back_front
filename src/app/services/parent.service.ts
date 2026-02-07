import { Injectable } from "@angular/core";
import { APP_CONSTANT } from "../../misc/app-constant";

@Injectable({
  providedIn: 'root',
})
export class ParentService {

  public logout() {
    localStorage.clear();
  }

  public setActiveChildAccount(childAccountId: string) {
    localStorage.setItem(APP_CONSTANT.ACTIVE_CHILD_ACCOUNT, JSON.stringify(childAccountId));
  }

  public setActiveParent(activeParent: Parent) {
    localStorage.setItem(APP_CONSTANT.ACTIVE_PARENT, JSON.stringify(activeParent));
  }
}

export interface Parent {
  parentId: string,
  roles: string []
}
