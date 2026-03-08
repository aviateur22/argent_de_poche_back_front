import { Component, inject } from '@angular/core';
import { MainContainer } from "../share/main-container/main-container";
import { Router } from '@angular/router';
import pageUrl from '../../../misc/page-url';
import { Link } from "../share/link/link";

@Component({
  selector: 'app-home',
  imports: [MainContainer, Link],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    private _router = inject(Router);


  /**
   * Se connecter
   */
  redirectToLoginPage() {
    this._router.navigate([pageUrl.login.url]);
  }

  /**
   * créer un compte
   */
  redirectToCreateFamilyPage() {
    this._router.navigate([pageUrl.createFamilyAccount.url]);
  }

}
