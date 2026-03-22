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
  public loadChildImage(childImageName: string, childAccountId: string, parentId: string): Observable<string> {

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

  /**
   * Chargement de l'image du QR code
   */
  public loadQrCodeImage(childAccountId: string, parentId: string): Observable<string> {

    return this._childAccountService.streamQrCodeOfChildAccount(parentId, childAccountId)
    .pipe(
        map(blob => URL.createObjectURL(blob)),
        startWith(this.placeholder)
      );
  }

}
