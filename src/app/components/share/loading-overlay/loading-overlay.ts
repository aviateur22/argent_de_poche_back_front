import { Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as selectors from '../../../store/selector';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading-overlay',
  imports: [AsyncPipe, ProgressSpinnerModule],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.css',
})
export class LoadingOverlay {

  private _store = inject(Store);

  requestStatus$ = this._store.pipe(select(selectors.requestStatusSelector));

}
