import { Routes } from '@angular/router';
import pageUrl from '../misc/page-url';
import { ChildAccountMoneyPage } from './components/childAccountMoney/child-account-money-page/child-account-money-page';
import { Login } from './components/auth/login/login';
import { ManageChildAccountPage } from './components/childAccountMoneyManager/manage-child-account-page/manage-child-account-page';
import { CreateChildAccountPage } from './components/createChildAccount/create-child-account-page/create-child-account-page';
import { FamilyAccountPage } from './components/familyAccount/family-account-page/family-account-page';
import { CreateFamilyAccountPage } from './components/createFamilyAccount/create-family-account-page/create-family-account-page';

export const routes: Routes = [
   { path: pageUrl.createChildAccount.url, component: CreateChildAccountPage, title: pageUrl.createChildAccount.title },
   { path: pageUrl.childAccount.url, component: ChildAccountMoneyPage, title: pageUrl.childAccount.title },
   { path: pageUrl.manageAccount.url, component: ManageChildAccountPage, title: pageUrl.manageAccount.title },
   { path: pageUrl.login.url, component: Login, title: pageUrl.login.title },
   { path: pageUrl.familyAccount.url, component: FamilyAccountPage, title: pageUrl.familyAccount.title},
   { path: pageUrl.createFamilyAccount.url, component: CreateFamilyAccountPage, title: pageUrl.createFamilyAccount.title }
];
