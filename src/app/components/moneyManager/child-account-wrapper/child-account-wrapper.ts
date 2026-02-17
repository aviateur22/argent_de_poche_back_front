import { Component, ContentChild, inject, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as selectors from '../../../store/selector';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-child-account-wrapper',
  imports: [AsyncPipe, NgTemplateOutlet],
  templateUrl: './child-account-wrapper.html',
  styleUrl: './child-account-wrapper.css',
})
export class ChildAccountWrapper {
  private _store = inject(Store);
  childMoneyAccount$ = this._store.pipe(select(selectors.childMoneyAccountSelector), startWith(null));
  @ContentChild(TemplateRef) contentTpl!: TemplateRef<any>;
}
