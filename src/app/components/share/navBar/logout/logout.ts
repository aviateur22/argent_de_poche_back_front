import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ParentService } from '../../../../services/parent.service';
import { Router } from '@angular/router';
import pageUrl from '../../../../../misc/page-url';

@Component({
  selector: 'app-logout',
  imports: [ConfirmDialogModule],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  private _confirmationService = inject(ConfirmationService);
  private _messageService = inject(MessageService);
  private _parentService = inject(ParentService);
  private _router = inject(Router);

  /**
   * Affichage popup de logout
   */
  confirmLogout() {
    this._confirmationService.confirm({

            message: 'Voulez-vous quitter?',
            rejectLabel: 'Non',
            rejectButtonProps: {
                label: 'Non',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Oui quitter',
                severity: 'info'
            },

            accept: () => {
              this.logout();
              this._messageService.add({ severity: 'success', summary: '', detail: 'Aurevoir' });
            }
        });
  }



  /**
   * Deconnexion du compte
   * Redirection page de login
   */
  logout() {
    this._parentService.logout();
    this._router.navigate([pageUrl.login.url]);
  }
}
