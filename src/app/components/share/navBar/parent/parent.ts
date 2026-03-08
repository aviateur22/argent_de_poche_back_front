import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import pageUrl from '../../../../../misc/page-url';

@Component({
  selector: 'app-parent',
  imports: [],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {

  private _router = inject(Router);

  /**
   * Rdirige vers la page d'accueil du compte
   */
  redirecToHomePage() {
    this._router.navigate([ pageUrl.familyAccount.url]);
  }
}
