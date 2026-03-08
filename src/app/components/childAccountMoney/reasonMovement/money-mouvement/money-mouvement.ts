import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReasonMovement } from '../../../../store/model';
import { ReasonButton } from "../reason-button/reason-button";

@Component({
  selector: 'app-money-mouvement',
  imports: [ReasonButton],
  templateUrl: './money-mouvement.html',
  styleUrl: './money-mouvement.css',
})
export class MoneyMouvement implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.selectBackgroundImage();
  }
  @Input() reasonMovement!: ReasonMovement;

  // Image de selectionnée
  imageSrc!: string

  private selectBackgroundImage(): void {
  // HIH,  //aide à la maison
  // RS, // Etat de la chambre
  // CB, // Comportement
  // SH, // Travail de classe
  // M // Repas

    switch (this.reasonMovement.reasonCode.toLowerCase()) {
      case 'hih': this.imageSrc = '/images/nettoyage.jpg'; break;
      case 'cb' : this.imageSrc = '/images/comportement.jpg'; break;
      case 'rs': this.imageSrc = '/images/chambre.jpg';break;
      case 'm' : this.imageSrc = '/images/repas.png'; break;
      case 'sh' : this.imageSrc = '/images/travail-classe.png'; break;
      default: this.imageSrc = '/images/nettoyage.jpg'; break;


    }
  }
}
