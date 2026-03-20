import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import apiUrl from '../../../../misc/api-url';
import { ParentService } from '../../../services/parent.service';
import { ManagerComponentContainer } from "../manager-component-container/manager-component-container";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-qr-code',
  imports: [ManagerComponentContainer, ButtonModule],
  templateUrl: './qr-code.html',
  styleUrl: './qr-code.css',
})
export class QrCode implements OnChanges {
  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;


  private _parentService = inject(ParentService);

  /**
   * Url permattant d'afficher l'image QR code
   * contenant l'URL d'accés du compte d'argnet de poche
   */
  qrCodeImageUrl!: string

     /**
    * L'image de chargement
    */
  placeholder = "/images/cbasic60.svg";

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChildImageUrl();
  }

  /**
   * Chargement de l'url de l'image du compte
   */
  loadChildImageUrl(): void {

    // Récupération de l'url d'accés a l'image
    this.qrCodeImageUrl = apiUrl.streamQrCodeOfChildAccount.url
      .replace('{parentId}', this.parentId)
      .replace('{childAccountId}', this.childMoneyAccount.childMoneyAccountId);
  }

  /**
   * Impressio du QR code
   */
  printQrCode() {
const printContents = document.getElementById('print')?.innerHTML;
  if (!printContents) {
    console.error("Aucun contenu à imprimer trouvé.");
    return;
  }

  // Crée un iframe caché pour éviter les bloqueurs de popup
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '-1000px';
  iframe.style.left = '-1000px';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (iframeDoc) {
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <title>Compte d'argent de poche</title>
          <style>
            body {
              text-align: center;
              font-family: Arial, sans-serif;
              margin-top: 50px;
              -webkit-print-color-adjust: exact; /* Pour les couleurs sur mobile */
            }
            img {
              width: 200px;
              height: 200px;
              max-width: 100%; /* Évite le débordement */
            }
            p {
              font-size: 18px;
              font-weight: bold;
              margin: 10px 0;
            }
            @media print {
              body {
                margin: 0;
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          ${printContents}
          <script>
            window.onload = function() {
              window.print();
              // Ne ferme pas automatiquement pour éviter les bugs sur mobile
            };
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
  } else {
    console.error("Impossible de créer le document dans l'iframe.");
  }
}

}
