import { inject, Injectable } from "@angular/core";
import { map, Observable, of, startWith } from "rxjs";
import { StreamChildAccountImageDto } from "../models/child-money.dto";
import { ChildMoneyAccountService } from "./child-money-account.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private _childAccountService = inject(ChildMoneyAccountService);

   /**
    * L'image de chargement
    */
  placeholder = "/images/cbasic60.svg";

  /**
   * Chargement de l'url de l'image du compte
   */
  public loadChildImageUrl(childImageName: string, childAccountId: string, parentId: string): Observable<string> {
    console.log(childImageName);

    const dto: StreamChildAccountImageDto = {
      parentId,
      childAccountId,
      imageName: childImageName
    }

    return this._childAccountService.streamChildImage(dto)
    .pipe(
        map(blob => URL.createObjectURL(blob)),
        startWith(this.placeholder)
      );
  }

}
