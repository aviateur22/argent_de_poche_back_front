import { Routes } from '@angular/router';
import pageUrl from '../misc/page-url';
import { ChildAccountMoneyPage } from './components/moneyManager/child-account-money-page/child-account-money-page';
import { Login } from './components/auth/login/login';
import { provideState } from '@ngrx/store';

export const routes: Routes = [
   { path: pageUrl.childAccount.url, component: ChildAccountMoneyPage, title: pageUrl.childAccount.title },
   { path: pageUrl.login.url, component: Login, title: pageUrl.login.title }
];
