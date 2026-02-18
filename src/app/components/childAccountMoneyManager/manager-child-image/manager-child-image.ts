import { Component, Input } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { ManagerComponentContainer } from "../manager-component-container/manager-component-container";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-manager-child-image',
  imports: [ManagerComponentContainer, InputNumberModule , InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './manager-child-image.html',
  styleUrl: './manager-child-image.css',
})
export class ManagerChildImage {
  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;

  /**
   * Mise à jour de la photo
   */
  updatePhoto(): void {

  }

  /**
   * Chargement de la nouvelle photo
   * @param file  La photo choisie
   */
  loadSelectedFile(file: File | undefined): void {

  }

}
