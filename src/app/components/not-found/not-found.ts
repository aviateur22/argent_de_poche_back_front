import { Component, inject } from '@angular/core';
import { MainContainer } from "../share/main-container/main-container";
import { Router } from '@angular/router';
import pageUrl from '../../../misc/page-url';

@Component({
  selector: 'app-not-found',
  imports: [MainContainer],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  private _router = inject(Router);

  redirectToHomePage() {
      this._router.navigate([pageUrl.home.url]);
  }
}
