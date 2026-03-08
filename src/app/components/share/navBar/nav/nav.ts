import { Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { parentSelector } from '../../../../store/selector'
import { AsyncPipe } from '@angular/common';
import { ThemeSelector } from "../theme-selector/theme-selector";
import { Logout } from "../logout/logout";
import { Parent } from "../parent/parent";
import { CoinAnimation } from "../../coin-animation/coin-animation";
import { Title } from "../title/title";

@Component({
  selector: 'app-nav',
  imports: [AsyncPipe, ThemeSelector, Logout, Parent, Title],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private _store = inject(Store);
  parent$ = this._store.pipe(select(parentSelector));
}
