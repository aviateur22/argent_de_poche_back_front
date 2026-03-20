import { Component, inject, OnInit } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { MainContainer } from "../../share/main-container/main-container";
import { InputNumberModule  } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ParentService } from '../../../services/parent.service';
import { ManagerChildName } from "../manager-child-name/manager-child-name";
import { ManagerInitialMoney } from "../manager-initial-money/manager-initial-money";
import { ManagerRemainingMoney } from "../manager-remaining-money/manager-remaining-money";
import { ManagerChildImage } from "../manager-child-image/manager-child-image";
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';
import { DesactivateChildAccount } from "../desactivate-child-account/desactivate-child-account";
import { QrCode } from "../qr-code/qr-code";


@Component({
  selector: 'app-manage-child-account',
  imports: [MainContainer, InputNumberModule, InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule, ManagerChildName, ManagerInitialMoney, ManagerRemainingMoney, ManagerChildImage, DesactivateChildAccount, QrCode],
  templateUrl: './manage-child-account-page.html',
  styleUrl: './manage-child-account-page.css',
})
export class ManageChildAccountPage implements OnInit {
  private _parentService = inject(ParentService);
  private _router = inject(Router);

  /**
   * Les données du compte d'argent de poche.
   * Ces données sont récupérées depuis le state de l'application
  */
  childMoneyAccount!: ChildMoneyAccount
  childImageurl!: string


  /**
   * L'identifiant du parent
   */
  parentId!: string;

  ngOnInit(): void {
      // Récupération des données du compte d'argent
      this.childMoneyAccount = history.state.childMoneyAccount;

      // Récupération de l'image du compte
      this.childImageurl = history.state.childImageurl;

      // Récupération de l'identifiant du parent
      this.parentId = this._parentService.getParentId();
  }

  /**
   * Redirection
   */
   redirect() {
    var url = pageUrl.childAccount.url.replace(':childAccountId', this.childMoneyAccount.childMoneyAccountId);
    this._router.navigate([url]);

  }

}
