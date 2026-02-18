import { Component, Input } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-remaminig-money',
  imports: [CurrencyPipe],
  templateUrl: './remaminig-money.html',
  styleUrl: './remaminig-money.css',
})
export class RemaminigMoney {
  @Input() childMoneyAccount!: ChildMoneyAccount;

}
