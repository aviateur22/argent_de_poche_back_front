import {  Component,  inject,  Input, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ChildMoneyAccount } from '../../../../store/model';

@Component({
  selector: 'app-remaminig-money',
  imports: [CurrencyPipe],
  templateUrl: './remaminig-money.html',
  styleUrl: './remaminig-money.css'
})
export class RemaminigMoney implements OnChanges {

  @Input() childMoneyAccount!: ChildMoneyAccount;
  private _store = inject(Store);

  isInitialMoneyUpdate = signal(false);
  isRemainingMoneyUpdate = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['childMoneyAccount'])
      return;

    this.dectectMoneyChange(changes);

  }

  /**
   * Détetction des modifications d'argent de poche restant et initial
   * En cas de détection, l'action isRemainingMoneyVisibleAction est dispatché afin d'afficher le composant
   * app-remaining-money-animation.
   *
   * @param changes L'ensemble des données ayant déclenchées l'"venement ngOnChange()
   */
  private dectectMoneyChange(changes: SimpleChanges) {

    const prevRemainingMoney = changes['childMoneyAccount'].previousValue?.remainingMoney;
    const currRemainingMoney = changes['childMoneyAccount'].currentValue?.remainingMoney;

    const prevInitialMoney = changes['childMoneyAccount'].previousValue?.moneyAtPeriodStart;
    const currInitialMoney = changes['childMoneyAccount'].currentValue?.moneyAtPeriodStart;

    // Modification argent de poche initial
    if(prevInitialMoney !== currInitialMoney)
      this.trigger(this.isInitialMoneyUpdate);

    // Modification argent de poche restant
    if(prevRemainingMoney !== currRemainingMoney) {
      this.trigger(this.isRemainingMoneyUpdate);
    }

  }

  /**
   * Affichage du composant app-remaining-money-animation en cas de modification d'argent de poche restant
   *
   * @param sig Le signal devant être mis a jour
   */
  private trigger(sig: WritableSignal<boolean>) {
    sig.set(false);

    requestAnimationFrame(() => {
      sig.set(true);
    });
  }
}
