import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParentService } from '../../../../services/parent.service';
import { addMoneyMovementAction, displayMessageAction } from '../../../../store/actions';
import { AddMoneyMovementDto } from '../../../../models/child-money.dto';
import { isRemainingMoneyVisibleAction } from '../../../../store/actions';
import { timer } from 'rxjs';

@Component({
  selector: 'app-reason-button',
  imports: [],
  templateUrl: './reason-button.html',
  styleUrl: './reason-button.css'
})
export class ReasonButton {
  private _store = inject(Store);
  private _activateRoute = inject(ActivatedRoute);
  private _parentService = inject(ParentService);
  isAnimationActive = signal(false);

  @Input() actionCode!: string;
  @Input() reasonCode!: string;
  @Input() imagePath!: string;


  /**
   * Ajout d'un mouvement d'argent
   */
  addMoneyMovement() {

    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');
    const parentId = this._parentService.getParentId();

    // Animation
    this.animateButton();

    // Affichage component
    this.animateComponent();

    if (!childAccountId) {
      this._store.dispatch(displayMessageAction({
        message: {
          isError: true,
          message: "Impossible de récupérer l'image du compte d'argent de poche",
          title: ''
        }
      }))
      throw new Error("Impossible de récupérer l'image du compte d'argent de poche");
    }

    const addMoneyMovement: AddMoneyMovementDto = {
      actionCode: this.actionCode,
      reasonCode: this.reasonCode,
      parentId,
      childAccountId: childAccountId

    }
    this._store.dispatch(addMoneyMovementAction({ addMoneyMovement }));
  }

  /**
   * Animation du button avec un effet de zoom
   */
  private animateButton() {
    this.isAnimationActive.set(true);
      setTimeout(() => {
        this.isAnimationActive.set(false);
      }, 300);
  }

  /**
   * Affichage du composant app-remaining-money-animation
   * Ce composant affiche l'argent de poche restant de manière visible.
   * Il disparait au bout de 3sec
   */
  private animateComponent() {
     this._store.dispatch(isRemainingMoneyVisibleAction({ isVisible: true }));
      timer(3000).subscribe(() => {
        this._store.dispatch(isRemainingMoneyVisibleAction({ isVisible: false }));
      });
  }
}
