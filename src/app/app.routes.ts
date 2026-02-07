import { Routes } from '@angular/router';
import pageUrl from '../misc/page-url';
import { ChildAccountMoneyPage } from './components/moneyManager/child-account-money-page/child-account-money-page';

export const routes: Routes = [
   { path: pageUrl.childAccount.url, component: ChildAccountMoneyPage, title: pageUrl.childAccount.title },
];
