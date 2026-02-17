import { inject, Injectable } from "@angular/core";
import { ToStateMapperService } from "./to-state-mapper.service";
import { ChildMoneyAccountModel } from "../models/child-money.model";
import { ChildAccountDto } from "../models/child-money.dto";

@Injectable({
  providedIn: 'root'
})
export class ToModelMapperService {

  private _toStateMapper = inject(ToStateMapperService);

}
