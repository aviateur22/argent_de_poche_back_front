import { Component, inject, OnInit } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { MainContainer } from "../../share/main-container/main-container";
import { InputNumberModule  } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ParentService } from '../../../services/parent.service';
import { Store } from '@ngrx/store';
import { ManagerChildName } from "../manager-child-name/manager-child-name";
import { ManagerInitialMoney } from "../manager-initial-money/manager-initial-money";
import { ManagerRemainingMoney } from "../manager-remaining-money/manager-remaining-money";
import { ManagerChildImage } from "../manager-child-image/manager-child-image";


@Component({
  selector: 'app-manage-child-account',
  imports: [MainContainer, InputNumberModule, InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule, ManagerChildName, ManagerInitialMoney, ManagerRemainingMoney, ManagerChildImage],
  templateUrl: './manage-child-account-page.html',
  styleUrl: './manage-child-account-page.css',
})
export class ManageChildAccountPage implements OnInit {
  private _store = inject(Store);
  private _parentService = inject(ParentService);

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

}
