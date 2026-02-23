import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FamilyChildAccountDto } from '../../../models/family-account.dto';
import { NgOptimizedImage } from "@angular/common";
import apiUrl from '../../../../misc/api-url';
import { CapitalizePipe } from '../../../pipe/capitalize-pipe';
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';

@Component({
  selector: 'app-family-child-account',
  imports: [NgOptimizedImage, CapitalizePipe],
  templateUrl: './family-child-account.html',
  styleUrl: './family-child-account.css',
})
export class FamilyChildAccount implements OnChanges {

  private _router = inject(Router);

  /**
   * Les données sur un compte d'argent de poche
   * Le nom de l'image
   * Le nom de l'enfant
   * L'identifiant du compte d'argent de poche
  */
 @Input() childAccount!: FamilyChildAccountDto;

  /**
    * L'identifiant du parent
  */
  @Input() parentId!: string;

  /**
   * L'url d'accés à l'image du compte d'argent de poche
   */
  childImageUrl!: string;

  /**
   * L'image de chargement
   */
  placeholder = "/images/cbasic60.svg";

  ngOnChanges(changes: SimpleChanges): void {
  if(this.childAccount && this.parentId)
    this.loadChildImage();
  }

  /**
   * Chargement de l'image du compte
   */
  loadChildImage():void {
    this.childImageUrl = apiUrl.streamChildImage.url
    .replace('{parentId}', this.parentId)
    .replace('{childAccountId}', this.childAccount.childAccountId)
    .replace('{imageName}', this.childAccount.imageRandomName);
  }

  /**
   * Redirection vers le compte d'argent de poche
   */
  redirectToChildAccountPage(): void {
    // L'identifiant du compte d'argent de poche
    const childAccountId = this.childAccount.childAccountId;

    const childAccountPageUrl = pageUrl.childAccount.url.replace(':childAccountId', childAccountId);

    this._router.navigate([childAccountPageUrl]);
  }
}
