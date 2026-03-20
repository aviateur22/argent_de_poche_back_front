import { Routes } from '@angular/router';
import pageUrl from '../misc/page-url';
import { ChildAccountMoneyPage } from './components/childAccountMoney/child-account-money-page/child-account-money-page';
import { Login } from './components/auth/login/login';
import { ManageChildAccountPage } from './components/childAccountMoneyManager/manage-child-account-page/manage-child-account-page';
import { CreateChildAccountPage } from './components/createChildAccount/create-child-account-page/create-child-account-page';
import { FamilyAccountPage } from './components/familyAccount/family-account-page/family-account-page';
import { CreateFamilyAccountPage } from './components/createFamilyAccount/create-family-account-page/create-family-account-page';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { DesactivateChildAccountSuccessPage } from './components/childAccountMoneyManager/desactivate-child-account-success-page/desactivate-child-account-success-page';
import { CreateFamilyAccountSuccessPage } from './components/createFamilyAccount/create-family-account-success-page/create-family-account-success-page';
import { LookChildAccountMoneyPage } from './components/displayChildAccountMoneyInfo/look-child-account-money-page/look-child-account-money-page';

export const routes: Routes = [
    { path: '', redirectTo: pageUrl.home.url, pathMatch: 'full' },
   { path: pageUrl.home.url, component: Home, title: pageUrl.home.title },
   { path: pageUrl.createChildAccount.url, component: CreateChildAccountPage, title: pageUrl.createChildAccount.title },
   { path: pageUrl.childAccount.url, component: ChildAccountMoneyPage, title: pageUrl.childAccount.title },
   { path: pageUrl.manageAccount.url, component: ManageChildAccountPage, title: pageUrl.manageAccount.title },
   { path: pageUrl.login.url, component: Login, title: pageUrl.login.title },
   { path: pageUrl.familyAccount.url, component: FamilyAccountPage, title: pageUrl.familyAccount.title},
   { path: pageUrl.createFamilyAccountSuccess.url, component: CreateFamilyAccountSuccessPage, title: pageUrl.createFamilyAccountSuccess.title },
   { path: pageUrl.createFamilyAccount.url, component: CreateFamilyAccountPage, title: pageUrl.createFamilyAccount.title },
   { path: pageUrl.notFound.url, component: NotFound, title: pageUrl.notFound.title },
   { path: pageUrl.desactivateChildAccountSuccess.url, component: DesactivateChildAccountSuccessPage, title: pageUrl.desactivateChildAccountSuccess.title },
   { path: pageUrl.displayChildAccountInfo.url, component: LookChildAccountMoneyPage, title: pageUrl.displayChildAccountInfo.title },
   { path: '**', redirectTo: pageUrl.notFound.url }
];
