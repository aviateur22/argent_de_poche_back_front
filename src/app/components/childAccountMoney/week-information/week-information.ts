import { Component, Input } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-week-information',
  imports: [DatePipe],
  templateUrl: './week-information.html',
  styleUrl: './week-information.css',
})
export class WeekInformation {
  @Input() childMoneyAccount!: ChildMoneyAccount;

}
