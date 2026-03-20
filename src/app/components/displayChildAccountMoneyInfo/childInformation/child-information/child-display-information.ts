import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChildMoneyAccount } from '../../../../store/model';
import { CapitalizePipe } from '../../../../pipe/capitalize-pipe';


@Component({
  selector: 'app-display-child-information',
  imports: [CapitalizePipe],
  templateUrl: './child-display-information.html',
  styleUrl: './child-display-information.css',
})
export class ChildDisplayInformation {

  @Input() childMoneyAccount!: ChildMoneyAccount;

}
