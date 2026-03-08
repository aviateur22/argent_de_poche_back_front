import { Component, inject } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { Link } from "../../share/link/link";
import pageUrl from '../../../../misc/page-url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desactivate-child-account-success-page',
  imports: [MainContainer, Link],
  templateUrl: './desactivate-child-account-success-page.html',
  styleUrl: './desactivate-child-account-success-page.css',
})
export class DesactivateChildAccountSuccessPage {
  private _router = inject(Router);

  /**
   * Redirection page familiale
   */
  redirectToFamilyPage() {
    this._router.navigate([pageUrl.familyAccount.url]);
  }

}
