import { Component, Input } from '@angular/core';
import { ReasonMovement } from '../../../../store/model';
import { ReasonButton } from "../reason-button/reason-button";

@Component({
  selector: 'app-money-mouvement',
  imports: [ReasonButton],
  templateUrl: './money-mouvement.html',
  styleUrl: './money-mouvement.css',
})
export class MoneyMouvement {
  @Input() reasonMovement!: ReasonMovement;
}
