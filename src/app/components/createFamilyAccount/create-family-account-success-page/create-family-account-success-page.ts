import { Component, inject } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { Link } from "../../share/link/link";
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';

@Component({
  selector: 'app-create-family-account-success-page',
  imports: [MainContainer, Link],
  templateUrl: './create-family-account-success-page.html',
  styleUrl: './create-family-account-success-page.css',
})
export class CreateFamilyAccountSuccessPage {
  private _router = inject(Router);

  redirectToLoginPage() {
    this._router.navigate([pageUrl.login.url]);
  }

}
