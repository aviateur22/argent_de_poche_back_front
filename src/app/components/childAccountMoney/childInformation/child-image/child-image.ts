import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ParentService } from '../../../../services/parent.service';
import { Observable, of } from 'rxjs';
import { ImageService } from '../../../../services/image.service';

@Component({
  selector: 'app-child-image',
  imports: [NgOptimizedImage, AsyncPipe],
  templateUrl: './child-image.html',
  styleUrl: './child-image.css',
})
export class ChildImage implements OnChanges {

  private _activateRoute = inject(ActivatedRoute);
  private _parentService = inject(ParentService);
  private _imageService = inject(ImageService);

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChildImage();
  }

  // Le nom de l'image du compte
  @Input() childImageName!: string;

  // L'image du compte qui sera chargé
  childImage$: Observable<string> = of('');

  /**
   * Chargement de l'url de l'image du compte
   */
  loadChildImage(): void {
    const childAccountId = this._activateRoute.snapshot.paramMap.get('childAccountId');
    const parentId = this._parentService.getParentId();

    // Si pas de données sur l'image
    if(!this.childImageName || !childAccountId)
      return;

    this.childImage$ = this._imageService.loadChildImageUrl(this.childImageName, childAccountId, parentId);
  }
}
