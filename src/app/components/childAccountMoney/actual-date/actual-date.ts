import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChildMoneyAccount } from '../../../store/model';

@Component({
  selector: 'app-actual-date',
  imports: [DatePipe],
  templateUrl: './actual-date.html',
  styleUrl: './actual-date.css',
})
export class ActualDate {
  @Input() childMoneyAccount!: ChildMoneyAccount;
}
