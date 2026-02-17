import { Routes } from '@angular/router';
import pageUrl from '../misc/page-url';
import { ChildAccountMoneyPage } from './components/moneyManager/child-account-money-page/child-account-money-page';
import { Login } from './components/auth/login/login';
import { ManageChildAccountPage } from './components/moneyManager/manage-child-account-page/manage-child-account-page';

export const routes: Routes = [
   { path: pageUrl.childAccount.url, component: ChildAccountMoneyPage, title: pageUrl.childAccount.title },
   { path: pageUrl.manageAccount.url, component: ManageChildAccountPage, title: pageUrl.manageAccount.title },
   { path: pageUrl.login.url, component: Login, title: pageUrl.login.title }
];
