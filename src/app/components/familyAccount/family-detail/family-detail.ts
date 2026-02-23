import { Component, Input } from '@angular/core';
import { FamilyAccountDto } from '../../../models/family-account.dto';
import { CapitalizePipe } from '../../../pipe/capitalize-pipe';

@Component({
  selector: 'app-family-detail',
  imports: [CapitalizePipe],
  templateUrl: './family-detail.html',
  styleUrl: './family-detail.css',
})
export class FamilyDetail {
  @Input() familyAccount!: FamilyAccountDto

}
