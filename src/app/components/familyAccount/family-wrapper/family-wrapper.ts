import { Component, ContentChild, inject, TemplateRef } from '@angular/core';
import * as selectors from "../../../store/selector";
import { select, Store } from '@ngrx/store';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';


@Component({
  selector: 'app-family-wrapper',
  imports: [AsyncPipe, NgTemplateOutlet],
  templateUrl: './family-wrapper.html',
  styleUrl: './family-wrapper.css',
})
export class FamilyWrapper {

  private _store = inject(Store);

  @ContentChild(TemplateRef) contentTpl!: TemplateRef<any>;

  familyAccount$ = this._store.pipe(select(selectors.familyAccountSelector));


}
