import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FamilyChildAccountDto } from '../../../models/family-account.dto';
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { CapitalizePipe } from '../../../pipe/capitalize-pipe';
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';
import { Observable, of } from 'rxjs';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-family-child-account',
  imports: [NgOptimizedImage, CapitalizePipe, AsyncPipe],
  templateUrl: './family-child-account.html',
  styleUrl: './family-child-account.css',
})
export class FamilyChildAccount implements OnChanges {

  private _router = inject(Router);
  private _imageService = inject(ImageService);

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

  // L'image du compte qui sera chargé
  childImage$: Observable<string> = of('');

  ngOnChanges(changes: SimpleChanges): void {
  if(this.childAccount && this.parentId)
    this.loadChildImage();
  }

/**
   * Chargement de l'url de l'image du compte
   */
  loadChildImage(): void {
    const childAccountId = this.childAccount.childAccountId;
    const childImageName = this.childAccount.imageRandomName;

    // Si pas de données sur l'image
    if(!childImageName || !childAccountId)
      return;

    this.childImage$ = this._imageService.loadChildImage(childImageName, childAccountId, this.parentId);
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
